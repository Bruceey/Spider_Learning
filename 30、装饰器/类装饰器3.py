# def tracer(func):
#     def wrapper(*args, **kwargs):
#         wrapper.calls += 1
#         print('call %s to %s ' % (wrapper.calls, func.__name__))
#         return func(*args, **kwargs)
#
#     wrapper.calls = 0
#     return wrapper

def tracer(func):
    calls = 0
    def wrapper(*args, **kwargs):
        nonlocal calls
        calls += 1
        print('call %s to %s ' % (calls, func.__name__))
        return func(*args, **kwargs)

    return wrapper

@tracer
def spam(a, b, c):
    return a + b + c


print(spam(1, 2, 3))

# class Person:
#     def __init__(self, name, pay):
#         self.name = name
#         self.pay = pay
#
#     @tracer
#     def giveRaise(self, percent):
#         self.pay *= (1.0 + percent)
#
#     @tracer
#     def lastName(self):
#         return self.name.split()[-1]
#
#
# bob = Person('Bob Smith', 50000)
# bob.giveRaise(.25)
# bob.giveRaise(.2)
