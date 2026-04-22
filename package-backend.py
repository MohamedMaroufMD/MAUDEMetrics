import os
import sys
import subprocess
import shutil
import platform

def main():
    system = platform.system().lower()
    
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--noconfirm",
        "--onefile",
        "--exclude-module", "pkg_resources",
        "--name", "maudemetrics",
        "--add-data", f"templates{os.pathsep}templates",
        "--add-data", f"static{os.pathsep}static",
        "app.py"
    ]

    # Keep backend console-less on Windows, but use console bootloader on macOS/Linux
    # so the executable behaves as a normal CLI server process.
    if system == "windows":
        cmd.insert(5, "--noconsole")
    subprocess.check_call(cmd)

    if os.path.exists("backend"):
        shutil.rmtree("backend")
    os.makedirs("backend")
    
    exe_name = "maudemetrics.exe" if system == "windows" else "maudemetrics"
    source_file = os.path.join("dist", exe_name)
    
    # On macOS, --noconsole might still produce a .app bundle in dist/
    if system == "darwin" and not os.path.exists(source_file):
        app_path = os.path.join("dist", f"{exe_name}.app", "Contents", "MacOS", exe_name)
        if os.path.exists(app_path):
            source_file = app_path

    shutil.copy2(source_file, os.path.join("backend", exe_name))
    print(f"Successfully packaged {exe_name} to backend/")

if __name__ == "__main__":
    main()
