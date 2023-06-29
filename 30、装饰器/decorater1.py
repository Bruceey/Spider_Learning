import time


def clock(func):
    def clocked(*args, **kwargs):
        print(args)
        t0 = time.time()
        result = func(*args) + '，我爱你！'
        elasped = time.time() - t0
        name = func.__name__
        arg_str = ', '.join(repr(arg) for arg in args)
        print('[%0.8fs] %s(%s) ->%r' %(elasped, name, arg_str, result))
        return result
    return clocked


@clock
def snooze(seconds):
    return "美杜莎"


snooze(1)
