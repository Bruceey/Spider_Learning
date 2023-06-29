class Desc(object):
    def __init__(self, name):
        self.name = name

    def __get__(self, instance, owner):
        print("__get__...")
        print('name = ',self.name)
        print('='*40, "\n")

class A:
    x = '我是父类的x'

class TestDesc(A):
    x = Desc('x')
    def __init__(self):
        self.y = Desc('y')

#以下为测试代码
t = TestDesc()
print(t.x)
print('+++'* 20)
print(t.y)