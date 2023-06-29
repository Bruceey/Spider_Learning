# class Decorator:
#     def __init__(self, C):
#         self.C = C
#
#     def __call__(self, *args, **kwargs):
#         self.wrapped = self.C(*args, **kwargs)
#         return self
#
#     def __getattr__(self, name):
#         return getattr(self.wrapped, name)
#
#
#
#
# @Decorator
# class C:
#     def __init__(self, x, y):
#         self.attr = 'spam'
#
#
# x = C(6, 7)
# print(x.attr)


class tracer:
    def __init__(self, func):
        self.calls = 0
        self.func = func

    def __call__(self, *args, **kwargs):
        self.calls += 1
        print('call %s to %s ' % (self.calls, self.func.__name__))
        return self.func(*args, **kwargs)


@tracer
def spam(a, b, c):
    return sum((a, b, c))


class Person:
    def __init__(self, name, pay):
        self.name = name
        self.pay = pay

    @tracer
    def giveRaise(self, percent):
        self.pay *= (1.0 + percent)

    @tracer
    def lastName(self):
        return self.name.split()[-1]


bob = Person('Bob Smith', 50000)
bob.giveRaise(.25)
