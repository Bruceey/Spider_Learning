import requests

cookies = {}
with open('豆瓣cookie') as f:
    cookie_list = eval(f.read())
    for cookie in cookie_list:
        cookies[cookie['name']] = cookie['value']


headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

url = 'https://www.douban.com/people/140995215/'
r = requests.get(url, headers=headers, cookies=cookies)
print(r.text)