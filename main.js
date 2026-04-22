const { app, BrowserWindow, dialog, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const { spawn } = require('child_process');
const getPort = require('get-port');

let mainWindow;
let pythonProcess;
let backendPort;

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
                detail: `You are running the latest version (${app.getVersion()}).`
              });
            };
            
            autoUpdater.once('update-not-available', onNotAvailable);
            
            autoUpdater.checkForUpdatesAndNotify().catch(err => {
              if (handled) return; handled = true;
              dialog.showErrorBox('Update Error', 'Could not fetch updates from GitHub. Check your internet connection.');
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
  await startPythonProcess();
  
  const backendUrl = `http://127.0.0.1:${backendPort}`;
  // One-file backend startup can be slower on first launch (especially Intel Macs).
  const isUp = await waitForBackend(backendUrl);

  if (isUp) {
    createWindow(backendUrl);
    autoUpdater.checkForUpdatesAndNotify();
  } else {
    dialog.showErrorBox("Startup Error", "The MAUDEMetrics backend engine failed to start.");
    app.quit();
  }
});

autoUpdater.on('update-available', () => console.log('Update available.'));
autoUpdater.on('update-downloaded', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Downloaded',
    message: 'A new version of MAUDEMetrics has been downloaded. The application will restart to complete the installation.',
    buttons: ['Restart Now']
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

app.on('window-all-closed', async () => {
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
