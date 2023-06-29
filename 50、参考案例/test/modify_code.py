import os
import re

# dir_path = '/Users/wangrui/PycharmProjects/Spider/50、参考案例/dianping_spider-master'
# os.chdir(dir_path)

def modify(dir):
    files = os.listdir(dir)
    for file in files:
        filename = os.path.join(dir, file)
        if os.path.isfile(filename) and file.endswith('.py'):
            with open(filename) as f:
                content = f.read()
                code = re.search(r'(?:import|from).*', content, re.S)
                if code:
                    with open(filename.replace('dianping_spider-master', 'dianping_spider')) as f:
                        f.write(code.group())
        elif os.path.isdir(filename):
            modify(os.path.join(dir, file),)

if __name__ == '__main__':
    modify('/Users/wangrui/PycharmProjects/Spider/50、参考案例/dianping_spider-master')