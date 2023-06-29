# class SingletonType(type):
#
#     def __init__(cls, *args, **kwargs):
#         print('元类__init__')
#         super(SingletonType, cls).__init__(*args, **kwargs)
#
#     def __call__(cls, *args, **kwargs):
#         print('元类__call__')
#         # obj = cls.__new__(cls, *args, **kwargs)
#         # cls.__init__(obj, *args, **kwargs)  # Foo.__init__(obj)
#         # return obj
#         super(SingletonType, cls).__call__(*args, **kwargs)
#
# print()
# class Foo(metaclass=SingletonType):
#     def __new__(cls, *args, **kwargs):
#         print('Foo __new__')
#         return object.__new__(cls)
#
#     def __init__(self, name):
#         print("Foo __init__")
#         self.name = name
#
#
# obj = Foo('name')
# print()


# 案例二、
class SingletonType(type):
    def __init__(cls, *args, **kwargs):
        print('元类__init__')
        super(SingletonType, cls).__init__(*args, **kwargs)

    def __call__(cls, *args, **kwargs):
        print('元类__call__')
        # obj = cls.__new__(cls, *args, **kwargs)
        obj = object.__new__(cls)
        cls.__init__(obj, *args, **kwargs)  # Foo.__init__(obj)
        return obj

print()
class Foo(metaclass=SingletonType):
    def __init__(self, name):
        print("Foo __init__")
        self.name = name

    def __new__(cls, *args, **kwargs):
        print('Foo __new__')
        return object.__new__(cls)


obj = Foo('fytyfh')
#
# print(obj)
#
# from django.db import models
# mol = models.Model()
print(obj.__class__)