import requests
from urllib.parse import urlencode

headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en,zh-CN;q=0.9,zh;q=0.8,und;q=0.7',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.lagou.com',
    'referer': 'https://www.lagou.com/jobs/list_python?labelWords=&fromSearch=true&suginput=',
    'x-anit-forge-code': '0',
    'x-anit-forge-token': 'None',
    'x-requested-with': 'XMLHttpRequest',
}

headers0 = {
'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
}


def get_proxy():
    return requests.get("http://127.0.0.1:5010/get/").json()


def delete_proxy(proxy):
    requests.get("http://127.0.0.1:5010/delete/?proxy={}".format(proxy))


url_base = 'https://www.lagou.com/jobs/positionAjax.json?'
request_params = {
    # 'city': "杭州",
    'needAddtionalResult': 'false'
}
url = url_base + urlencode(request_params)

data = {
    "first": 'true',
    "pn": '1',
    "kd": "python",
    # "sid": "c29ac195b7e248bf8748ba69552ba2f3"
}

# proxy = get_proxy().get("proxy")
# r = requests.post(url, headers=headers, proxies={"http": f"http://{proxy}"}, data=data)
session = requests.Session()
session.get("https://www.lagou.com/", headers=headers0)
print(session.cookies)
r = session.post(url, data=data, headers=headers)
# r = requests.get('https://www.lagou.com/jobs/list_python?labelWords=&fromSearch=true&suginput=', proxies={"http": f"http://{proxy}"})
print(r.status_code)
print(r.text)
