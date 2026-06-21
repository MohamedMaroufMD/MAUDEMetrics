const { app, BrowserWindow, dialog, Menu, shell } = require('electron');
const { autoUpdater } = require('electron-updater');

// On macOS, auto-install via ZIP is unreliable on unsigned apps — open release page instead
autoUpdater.autoDownload = process.platform !== 'darwin';
const path = require('path');
const { spawn } = require('child_process');
const getPort = require('get-port');

let mainWindow;
let splashWindow;
let pythonProcess;
let backendPort;
let isUpdating = false;

async function startPythonProcess() {
  backendPort = await getPort();
  const userDataDir = app.getPath('userData');
  
  let scriptPath;
  let useExecutable = false;

  if (app.isPackaged) {
    useExecutable = true;
    if (process.platform === 'win32') {
      scriptPath = path.join(process.resourcesPath, 'backend', 'maudemetrics.exe');
    } else {
      scriptPath = path.join(process.resourcesPath, 'backend', 'maudemetrics');
    }
  } else {
    // Development fallback
    scriptPath = path.join(__dirname, 'app.py');
  }

  const args = [`--port=${backendPort}`, `--data-dir=${userDataDir}`];
  console.log(`Starting backend. Port: ${backendPort}, Executable: ${useExecutable}, Path: ${scriptPath}`);

  if (useExecutable) {
    pythonProcess = spawn(scriptPath, args);
  } else {
    pythonProcess = spawn('python3', [scriptPath, ...args]);
  }

  pythonProcess.stdout.on('data', (data) => console.log(`Backend stdout: ${data}`));
  pythonProcess.stderr.on('data', (data) => console.error(`Backend stderr: ${data}`));
  pythonProcess.on('close', (code) => console.log(`Backend process exited with code ${code}`));
}

async function waitForBackend(url, maxRetries = 300) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await fetch(url);
      if (resp.ok || resp.status === 404) {
        return true;
      }
    } catch (e) {
      // expected on connection refused during startup
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return false;
}

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 380,
    height: 260,
    frame: false,
    resizable: false,
    center: true,
    alwaysOnTop: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
    icon: app.isPackaged
      ? path.join(process.resourcesPath, '..', 'assets', 'icon.png')
      : path.join(__dirname, 'static', 'favicon.png')
  });

  splashWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;
height:100vh;background:#0d1b2a;color:#fff;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.name{font-size:26px;font-weight:700;color:#4da6ff;letter-spacing:.5px}
.sub{font-size:12px;color:#6c8ebf;margin-top:4px;margin-bottom:28px}
.spinner{width:30px;height:30px;border:3px solid rgba(77,166,255,.2);
border-top-color:#4da6ff;border-radius:50%;animation:spin .8s linear infinite}
.status{margin-top:14px;font-size:11px;color:#4a6080}
@keyframes spin{to{transform:rotate(360deg)}}
</style></head><body>
<div class="name">MAUDEMetrics</div>
<div class="sub">FDA Adverse Event Analytics</div>
<div class="spinner"></div>
<div class="status">Starting up…</div>
</body></html>`)}`);
}

function createWindow(url) {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: app.isPackaged
      ? path.join(process.resourcesPath, '..', 'assets', 'icon.png')
      : path.join(__dirname, 'static', 'favicon.png')
  });

  mainWindow.loadURL(url);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Updates',
      submenu: [
        {
          label: `Version ${app.getVersion()}`,
          enabled: false
        },
        { type: 'separator' },
        {
          label: 'Check for Updates...',
          click: () => {
            let handled = false;

            const onNotAvailable = () => {
              if (handled) return; handled = true;
              dialog.showMessageBox({
                type: 'info',
                title: 'Up to Date',
                message: 'MAUDEMetrics is currently up to date.',
                detail: `You are running version ${app.getVersion()}.`
              });
            };

            const onAvailable = () => { handled = true; };

            autoUpdater.once('update-not-available', onNotAvailable);
            autoUpdater.once('update-available', onAvailable);

            if (mainWindow) mainWindow.setTitle('MAUDEMetrics — Checking for updates…');
            autoUpdater.checkForUpdates().catch(err => {
              if (handled) return; handled = true;
              if (mainWindow) mainWindow.setTitle('MAUDEMetrics');
              dialog.showErrorBox('Update Error', 'Could not reach GitHub. Check your internet connection.');
            }).finally(() => {
              if (!handled) return;
              if (mainWindow) mainWindow.setTitle('MAUDEMetrics');
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(async () => {
  createMenu();
  createSplashWindow();
  await startPythonProcess();

  const backendUrl = `http://127.0.0.1:${backendPort}`;
  const isUp = await waitForBackend(backendUrl);

  if (isUp) {
    createWindow(backendUrl);
    if (splashWindow) { splashWindow.destroy(); splashWindow = null; }
    autoUpdater.checkForUpdatesAndNotify();
  } else {
    dialog.showErrorBox("Startup Error", "The MAUDEMetrics backend engine failed to start.");
    app.quit();
  }
});

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  if (process.platform === 'darwin') {
    const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
    const dmgUrl = `https://github.com/MohamedMaroufMD/MAUDEMetrics/releases/latest/download/MAUDEMetrics-${arch}.dmg`;
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: `MAUDEMetrics ${info.version} is available.`,
      detail: 'Click "Download" to download the installer for your Mac.',
      buttons: ['Download', 'Later']
    }).then((result) => {
      if (result.response === 0) {
        shell.openExternal(dmgUrl);
      }
    });
  }
});

autoUpdater.on('download-progress', (progress) => {
  const percent = Math.round(progress.percent);
  if (mainWindow) mainWindow.setTitle(`MAUDEMetrics — Downloading update ${percent}%`);
});

autoUpdater.on('update-downloaded', (info) => {
  if (mainWindow) mainWindow.setTitle('MAUDEMetrics');
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: `MAUDEMetrics ${info.version} has been downloaded.`,
    detail: 'The application will restart to install the update.',
    buttons: ['Restart Now', 'Later']
  }).then((result) => {
    if (result.response === 0) {
      isUpdating = true;
      autoUpdater.quitAndInstall(false, true);
    }
  });
});

app.on('window-all-closed', async () => {
  if (isUpdating) return;
  if (pythonProcess) {
    try {
      await fetch(`http://127.0.0.1:${backendPort}/quit`);
    } catch(e) {}
    pythonProcess.kill();
  }
  app.quit();
});

app.on('will-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
});
