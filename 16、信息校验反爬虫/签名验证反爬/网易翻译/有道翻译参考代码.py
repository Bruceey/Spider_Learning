import requests
import hashlib
import time
import random
import json

url = 'http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'


def get_md5(value):
    md5 = hashlib.md5()
    md5.update(value.encode('utf-8'))
    return md5.hexdigest()


def get_parm(word):
    parm_list = []
    user_agent = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
    bv = get_md5(user_agent)
    lts = str(round(time.time() * 1000))
    salt = lts + str(random.randint(0, 10))
    sign = get_md5("fanyideskweb" + word + salt + "]BjuETDhU)zqSxf-=B#7m")
    parm_list.append(bv)
    parm_list.append(lts)
    parm_list.append(salt)
    parm_list.append(sign)
    return parm_list


def get_request_parm(word):
    parm = get_parm(word)
    parms = {
        'i': word,
        'from': 'AUTO',
        'to': 'AUTO',
        'smartresult': 'dict',
        'client': 'fanyideskweb',
        'salt': parm[2],
        'sign': parm[3],
        'lts': parm[1],
        'bv': parm[0],
        'doctype': 'json',
        'version': '2.1',
        'keyfrom': 'fanyi.web',
        'action': 'FY_BY_CLICKBUTTION',
    }
    return parms


if __name__ == "__main__":
    session = requests.session()
    session.get('http://fanyi.youdao.com/')  # 访问首页获取cookie保存到session中
    while True:
        # word = input('请输入需要查询的单词:')
        word = '美女'
        parms = get_request_parm(word)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
            'Referer': 'http://fanyi.youdao.com/',
        }
        response = session.post(url, headers=headers, data=parms)
        print(response.text)
        result_json = json.loads(response.text)
        result = result_json["translateResult"][0][0]['tgt']
        print(result)
