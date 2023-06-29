import requests

cookie = "dplet=618c919c0451f59d8df7cf468ebd99afc; dper=a98ea09a3296d161d176cb92562ffdc56b5ad98afd204d3b546b6ee71cf7a14134493aaf0a7bffbbc8e2579470ff679c21d301ed4925446b14e14d8dd25beece97393ae183b16ce5e924042e331c2409ffb5e77a6a72f127f7f74493289df21a0327b; ll=7fd06e815b7dd96be3df069decf7836c3df; ua=xxx; ctu=9bbc3cb2a1b95ca6d2053b67f9bb3110b0714037e4a626d6daad8aaf969b1eb9e2d1f733f89a9c542c6824a048a0a5d3"

headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
    'cookie': cookie,
}

start_url = 'http://www.dianping.com/'
session = requests.Session()
session.headers.update(headers)
session.get(start_url)

url = 'http://www.dianping.com/member/2492023109'
r = session.get(url)
print(r.status_code)
print(r.text)