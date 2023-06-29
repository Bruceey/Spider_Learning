import requests
import random
import time
import hashlib
from urllib.parse import urljoin
import json
import sys

base_url = 'http://fanyi.youdao.com/'
rest = 'translate_o?smartresult=dict&smartresult=rule'
post_url = urljoin(base_url, rest)

headers = {
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
    'Referer': 'http://fanyi.youdao.com/',
}

proxies = {
    'http': "http://106.110.195.22:9999",
}


def get_md5(value):
    md5 = hashlib.md5()
    md5.update(value.encode('utf-8'))
    return md5.hexdigest()

keyword = "美女"
# 时间戳 13 + 1 = 14 位数
i = str(random.randint(1, 9))
lts = str(int(time.time() * 1000))
salt = lts + i

bv = get_md5("5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36")

data = {
    'i': None,
    'from': 'AUTO',
    'to': 'AUTO',
    'smartresult': 'dict',
    'client': 'fanyideskweb',
    'salt': salt,
    'sign': None,
    'lts': lts,
    'bv': bv,
    'doctype': "json",
    'version': "2.1",
    'keyfrom': "fanyi.web",
    'action': "FY_BY_REALTlME"
}

session = requests.session()

def get_session():
    session.get('http://fanyi.youdao.com/', headers=headers)  # 访问首页获取cookie保存到session中

def get_tranlation_result(keyword):
    data['i'] = keyword
    data['sign'] = get_md5("fanyideskweb" + keyword + salt + "Tbh5E8=q6U3EXe+&L[4c@")
    try:
        res = session.post(post_url, data=data, headers=headers)
        text = res.text
        if "<block>true</block>" in text:
            print("你被网易翻译屏蔽了!!!!!!")
            sys.exit()
        data_dict = json.loads(text)
        print(data_dict["translateResult"][0][0]['tgt'])
    except Exception as e:
        print(e)
        # 更新cookie
        get_session()
        get_tranlation_result(keyword)

def main():
    get_session()
    while True:
        keyword = input('请输入需要查询的单词: ')
        # keyword = '美女'
        get_tranlation_result(keyword)



if __name__ == '__main__':
    main()