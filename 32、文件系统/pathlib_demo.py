from pathlib import Path

file = Path('/Users/wangrui/PycharmProjects/Spider/test.txt')
file.stem
with open(file) as f:
    print(f.read())
