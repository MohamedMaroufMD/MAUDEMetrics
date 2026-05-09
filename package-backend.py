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

    # Append platform-specific flags *after* the base command list so that
    # the index is never wrong if other flags are added in the future.
    if system == "windows":
        cmd.append("--noconsole")

    subprocess.check_call(cmd)

    if os.path.exists("backend"):
        shutil.rmtree("backend")
    os.makedirs("backend")

    exe_name = "maudemetrics.exe" if system == "windows" else "maudemetrics"
    source_file = os.path.join("dist", exe_name)

    # On macOS, PyInstaller may produce a .app bundle instead of a bare binary.
    if system == "darwin" and not os.path.exists(source_file):
        app_path = os.path.join("dist", f"{exe_name}.app", "Contents", "MacOS", exe_name)
        if os.path.exists(app_path):
            source_file = app_path

    if not os.path.exists(source_file):
        raise FileNotFoundError(
            f"PyInstaller output not found at expected path: {source_file}\n"
            "Check the PyInstaller build log above for errors."
        )

    dest = os.path.join("backend", exe_name)
    shutil.copy2(source_file, dest)
    print(f"[OK] Packaged {exe_name} -> backend/")


if __name__ == "__main__":
    main()
