with open('test.txt', 'w') as fout:
    a = 12
    line = 'test line\n'
    fout.write(line)

# print('a=', a)  #这里访问了a变量，会报错吗？并不会。

s = 'HttpOnly'
print(','.join(i for i in s))


import pandas as pd

df = pd.DataFrame()

if len(df.index) == 0:
    print(len(df.index))

print("fsfsfff")
import random
list1 = ['a', 'b', 'c', 'd']
for i in "fdf":
    ss = random.choice(list1)
    list1.remove(ss)
print(list1)