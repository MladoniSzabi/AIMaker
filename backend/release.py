from re import sub
import subprocess
import os
import threading

sudo_uid = int(os.getenv("SUDO_UID"))
sudo_gid = int(os.getenv("SUDO_GID"))

frontendPath = os.path.join(os.getcwd(), "frontend")
os.setresgid(sudo_gid, sudo_gid, -1)
os.seteuid(sudo_uid)
os.setresuid(sudo_uid, sudo_uid, -1)
os.environ.unsetenv("SUDO_UID")
os.environ.unsetenv("SUDO_GID")
frontend = subprocess.Popen(os.path.join(frontendPath, "aimaker"), cwd=frontendPath)
os.setresgid(0, 0, -1)
os.seteuid(0)
os.setresuid(0, 0, -1)
# import main
# main.main()

print("Started")
input()

frontend.terminate()