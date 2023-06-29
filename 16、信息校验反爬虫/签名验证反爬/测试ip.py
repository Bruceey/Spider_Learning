import requests

proxy = {
    'http': "http://115.221.241.252:9999",
}

if __name__ == '__main__':

    session = requests.Session()
    r = session.get("http://fanyi.youdao.com/", proxies=proxy)
    print(r.content.decode('utf8'))