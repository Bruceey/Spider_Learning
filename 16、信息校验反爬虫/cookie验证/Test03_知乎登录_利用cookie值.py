import requests

with open('知乎cookie') as f:
    cookie = f.read()

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
    'cookie': cookie
}

url = 'https://www.zhihu.com/people/xiao-feng-can-yue-23-1'
r = requests.get(url, headers=headers)
print(r.text)