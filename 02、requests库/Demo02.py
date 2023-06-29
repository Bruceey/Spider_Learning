import requests

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36",
    "referer": "https://www.zhihu.com/"
}

cookies = "你的cookie值"
cookies = {str[:str.index('=')]:str[str.index('=')+1:] for str in cookies.split("; ")}

url = "https://www.zhihu.com/people/xiao-feng-can-yue-23-1"

# html = requests.get(url, headers=headers, cookies=cookies).text
# print(html)
# print("*" * 100)
# print("*" * 100)
#
html2 = requests.get('https://www.zhihu.com/collection/631049787', headers = headers, cookies=cookies).text
print(html2)

proxies = {
    "http": "http://10.10.1.11:3298",
    "https": "http://10.10.1.11:3452"
}

