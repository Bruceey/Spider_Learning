import requests

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    'referer': 'https://accounts.douban.com/passport/login_popup?login_source=anony'
}

data = {
'ck': '',
'remember': 'true',
'name': '你的用户名',
'password': '你的密码',
}

login_url = 'https://accounts.douban.com/j/mobile/login/basic'

session = requests.Session()
# session.headers.update(headers)
r = session.post(login_url, data=data, headers=headers)
print(r.text)
r2 = session.get('https://www.douban.com/people/140995215/', headers=headers)
print(r2.text)

print(session.headers)
