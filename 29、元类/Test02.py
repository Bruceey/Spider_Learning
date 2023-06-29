# dd = {'domain': 'login2.scrape.center', 'expiry': 1614503071, 'httpOnly': True, 'name': 'sessionid', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': 'engmxxi4t3rn268fnk4hbbfspntb9wy6'}
# dd2 = {'domain': 'login1.scrape.center', 'expiry': 1614503071, 'httpOnly': True, 'name': 'sessionid', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': 'engmxxi4t3rn268fnk4hbbfspntb9wy6', 'name2': 'hhh'}
#
# # dd3 = {**dd, **dd2}
# dd2.update(dd)
# print(dd2)
#


# class Singleton(object):
#     def __new__(cls, *args, **kwargs):
#         if not hasattr(cls,"_instance"):
#             cls._instance = super(Singleton, cls).__new__(cls, *args, **kwargs)
#         return cls._instance
#
#
# s1 = Singleton()
# s2 = Singleton()
#
# print(s1 is s2)


class Singleton(type):
    def __init__(cls, classname, supers, classdict):
        print("__init__")
        cls.__instance = None
        super().__init__(classname, supers, classdict)

    def __call__(cls, *args, **kwargs):
        print("__call__")
        if cls.__instance is None:
            cls.__instance = super().__call__(*args, **kwargs)
        return cls.__instance

print()
class Foo(metaclass=Singleton):     #在代码执行到这里的时候，元类中的__new__方法和__init__方法其实已经被执行了，而不是在Foo实例化的时候执行。且仅会执行一次。
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)

    def __init__(self, *args, **kwargs):
        print("Foo __init__")



foo1 = Foo()
foo2 = Foo()

# print Foo.__dict__  #_Singleton__instance': <__main__.Foo object at 0x100c52f10> 存在一个私有属性来保存属性，而不会污染Foo类（其实还是会污染，只是无法直接通过__instance属性访问）

# print foo1 is foo2  # True