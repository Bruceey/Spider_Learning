# class MyProperty:
#     def __init__(self, func):
#         self.func = func
#
#     def __get__(self, instance, owner):
#         if instance is None:
#             return self
#         print(f"在{self.__class__}中获取{instance}的属性")
#         return self.func(instance)
#
#
# class Person:
#     def __init__(self, name, age):
#         self.name = name
#         self.age = age
#
#
#     def total(self):
#         return str(self.name) + str(self.age)
#
#
# p = Person("美杜莎", 20)
# a = Person.total(p)
# print(a)


# class Singleton(object):
#     __instance = None
#
#     def __new__(cls, name, age):
#         # 如果类属性__instance的值为None，那么就创建一个对象
#         if not cls.__instance:
#             cls.__instance = object.__new__(cls)
#         # 如果已经有实例存在，直接返回
#         return cls.__instance
#
#     def __init__(self, name, age):
#         self.name = name
#         self.age = age
#
#
# a = Singleton("Zhangsan", 18)
# print(Singleton.__mro__)
# print(a.name, a.age)
# b = Singleton("lisi", 20)
# print(a.name, a.age)
# print(b.name, b.age)
#
# print(id(a))
# print(id(b))
#
# a.age = 30  # 给a指向的对象添加一个属性
# print(b.age)  # 获取b指向的对象的age属性

# class A:
#     pass
#
# class A2:
#     pass
#
# class B(A, A2):
#     pass
#
# class C(A):
#     pass
#
# class D(C, B):
#     pass
#
# print(D.__mro__)


class Student(object):
    __num = 2

    def __init__(self, price):
        self.price = price

    def get_price(self):

        return self.price * self.getNum()

    @classmethod
    def getNum(cls):
        return cls.__num

    @classmethod
    def getNum2(cls):
        return cls.getNum()

    @staticmethod
    def addNum():
        Student.__num += 1


a = Student(2)
print(a.getNum2())
# print(Student.get_price(a))
# print(a.getNum())
# print(a.addNum())
# print(Student.getNum())
