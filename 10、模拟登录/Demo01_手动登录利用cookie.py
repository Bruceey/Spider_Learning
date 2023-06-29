import requests

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}
cookie = """sessionid=wtpxd5hqzvj6u5nog0nq7hqjwndtt2ox"""
# cookie = {cookie.split("=")[0]: cookie.split('=')[1]}


response = requests.get('https://login2.scrape.center/', cookies=cookie, headers=headers)
print(response.text)
