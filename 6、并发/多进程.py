import subprocess

# 运行外部命令
completed = subprocess.run(['ls', '-l'])
print('returncode', completed.returncode)