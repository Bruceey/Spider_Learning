import requests
from lxml import etree
from random import randint
import time
import hashlib

headers = {
    "user-agent": 'fwjffoython',
}
url = 'http://localhost:8206/fet'

def get_param():
    action = ''.join(str(randint(0, 8)) for i in range(5))
    tim = str(round(time.time()))
    randstr = ''.join(chr(i) for i in range(65, 91))
    manipulator = hashlib.md5((action + tim + randstr).encode('utf8'))
    hexs =  manipulator.hexdigest()
    return {
        'actions': action,
        'tim': tim,
        'randstr': randstr,
        'sign': hexs
    }

params = get_param()
r = requests.get(url, headers=headers, params=params)
print(r.status_code)
print(r.text)