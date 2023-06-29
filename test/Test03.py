import redis

# pool = redis.ConnectionPool(host='localhost', port=6379, decode_responses=True)
# r = redis.Redis(connection_pool=pool)
# # r.set('food', 'mutton')    # key是"food" value是"mutton" 将键值对存入redis缓存
# print(r.get('fooda') + "fawf")  # mutton 取出键food对应的值
# r.close()

import atexit


@atexit.register
def clean():
    print('清理环境相关的代码')


num = 0
for i in range(1000000000000000000):
    num /= 4

print(num)
