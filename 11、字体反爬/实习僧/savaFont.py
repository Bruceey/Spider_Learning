import requests
import parsel
from urllib.request import urlretrieve
import os

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

r = requests.get('https://www.shixiseng.com/intern/inn_5q7iq6iv6m8h?pcm=pc_SearchList', headers=headers)
print(r.status_code)
if r.status_code == 200:
    sel = parsel.Selector(r.text)
    font_url = sel.re_first(r'src: url\("(.+?)"\)')

    urlretrieve(font_url, os.path.join(os.path.dirname(__file__), '实习僧2.woff'))
