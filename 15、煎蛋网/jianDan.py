import requests
import time
time.time()

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}


url = 'http://jandan.net/ooxx'
r = requests.get(url, headers=headers)
print(r.text)