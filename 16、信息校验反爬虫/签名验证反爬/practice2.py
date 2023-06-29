import requests
from lxml import etree
from random import randint
import time
import hashlib

headers = {
    "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
    'Referer': 'http://fanyi.youdao.com/',
}
url = 'https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'

def get_md5(value):
    manipulator = hashlib.md5(value.encode('utf-8'))
    return manipulator.hexdigest()

def generateSaltSign(keyword):
    t = get_md5(headers['User-Agent'])
    r = str(int(time.time() * 1000))
    i = r + str(randint(1, 9))
    return {
        'lts': r,
        'bv': t,
        'salt': i,
        'sign': get_md5("fanyideskweb" + keyword + i + "Tbh5E8=q6U3EXe+&L[4c@")
    }

def get_session():
    session = requests.session()
    r = session.get('http://fanyi.youdao.com/', headers=headers)  # 访问首页获取cookie保存到session中
    print(r.text)
    print(r.cookies)
    return session

data = {
    'i': '',
    'from': ' AUTO',
    'to': ' AUTO',
    'smartresult': ' dict',
    'client': ' fanyideskweb',
    'salt': ' 16207127332546',
    'sign': ' 2033b539746666f0c6647c1f1e799ab3',
    'lts': ' 1620712733254',
    'bv': ' a0164ac5e91a4449d7f8edca412e456e',
    'doctype': ' json',
    'version': ' 2.1',
    'keyfrom': ' fanyi.web',
    'action': ' FY_BY_REALTlME'
}

if __name__ == '__main__':
    keyword = '美女'
    data.update(generateSaltSign(keyword))
    data['i'] = keyword
    session = get_session()
    print(session.headers)
    r = session.post(url, data=data, headers=headers)

    print(r.status_code)
    print(r.text)
