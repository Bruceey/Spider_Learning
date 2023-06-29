# data = {'user': 'rr'}
# print(data.pop('user'))
# print(data.pop('ff'))
# print(data)

import requests
from fake_useragent import UserAgent

url = 'https://so.toutiao.com/'
r = requests.get(url, headers={'User-Agent': UserAgent().random})
r2 = requests.head(url, headers={'User-Agent': UserAgent().random})
print()