"""
Form data:
    # 用户名
    uid: 你的用户名
    pwd: 1e0903bb0545412bf227c1b92130f70b24c1e080b7d55396169328e7970b958a03221953f797103bbf3d28f4be265e5ee92cc06a821e4876f4d3ebc223d364285a8075523e6b3bde69b2bc9778ffe4aa3b136cab4a7d1d484198f0838454dc68876c93ed029e69e73503cdedf99ec85aa5a10c24781a6c11f9cc3cfce42c0f6d
    Service: soufun-passport-web
    AutoLogin: 1


    var key_to_encode = new RSAKeyPair("010001", "", "978C0A92D2173439707498F0944AA476B1B62595877DD6FA87F6E2AC6DCB3D0BF0B82857439C99B5091192BC134889DFF60C562EC54EFBA4FF2F9D55ADBCCEA4A2FBA80CB398ED501280A007C83AF30C3D1A142D6133C63012B90AB26AC60C898FB66EDC3192C3EC4FF66925A64003B72496099F4F09A9FB72A2CF9E4D770C41");

"""

import requests
import rsa
import execjs
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
    # "Origin": "https://passport.fang.com",
    "Referer": "https://passport.fang.com/",
}


def getRsaPwd(pwd):
    with open('rsa.min.js') as f:
        js_code = f.read()
    ctx = execjs.compile(js_code)
    return ctx.call('getRsaPwd', pwd)


start_url = 'https://passport.fang.com/'
login_url = 'https://passport.fang.com/login.api'
url = 'https://my.fang.com/'

data = {
    'uid': '你的用户名',
    'pwd': getRsaPwd('你的密码'),
    'Service': 'soufun-passport-web',
    'AutoLogin': '1',
}

session = requests.Session()
session.headers.update(headers)
start_r = session.get(start_url)
rsa_pair = re.search()



# login_response = session.post(login_url, data=data)
# print(login_response.text)
#
# r = session.get(url)
# print('让往事随风' in r.text)
