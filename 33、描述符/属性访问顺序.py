# 代码 2

class Desc(object):
    def __init__(self, name):
        self.name = name

    def __get__(self, instance, owner):
        print("__get__...")
        print('name = ', self.name)
        print('=' * 40, "\n")
        return '从描述符里面得到x'

    # def __set__(self, instance, value):
    #     print("fkkglslk")


class TestDesc(object):
    x = Desc('x')

    def __init__(self, num):
        self.x = '实例属性x'



# 以下为测试代码
t = TestDesc(3)
print(t.x)


