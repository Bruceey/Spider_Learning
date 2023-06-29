import requests


headers = {
    # 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15',
    'Accept-Encoding': ', '.join(('gzip', 'deflate')),
    'Accept': '*/*',
    'Connection': 'keep-alive',

}
start_url = 'https://www.baidu.com'

session = requests.Session()
session.headers = headers
r = session.get(start_url)
r2 = session.get("https://www.jd.com")
print(r.request.headers)
print(r2.request.headers)
print(r.headers)