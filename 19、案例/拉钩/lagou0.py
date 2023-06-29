import requests
from urllib.parse import urlencode
import random

user_agent = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2919.83 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2866.71 Safari/537.36',
]

headers = {
    'User-Agent': random.choice(user_agent)
}

def get_proxy():
    return requests.get("http://127.0.0.1:5010/get/").json()


def delete_proxy(proxy):
    requests.get("http://127.0.0.1:5010/delete/?proxy={}".format(proxy))

start_url = "https://www.lagou.com/"
second_url = "https://www.lagou.com/jobs/list_python?labelWords=&fromSearch=true&suginput="
url_base = 'https://www.lagou.com/jobs/positionAjax.json?'

request_params = {
    'city': "杭州",
    'needAddtionalResult': False,
}

url = url_base + urlencode(request_params)

data = {
    'first': False,
    'pn': 1,
    'kd': 'python',
    # "sid": "c29ac195b7e248bf8748ba69552ba2f3"
}


proxy = get_proxy().get("proxy")
proxy_dict = {
    "http": f"http://{proxy}",
}

session = requests.Session()
session.headers.update(headers)
session.proxies = proxy_dict
r0 = session.get(start_url)
r1 = session.get(second_url)
cookie = r1.cookies
r = session.post(url, data=data)
print(r.text)


