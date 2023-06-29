"""电影数据网站，无反爬，数据通过服务端渲染，适合基本爬虫练习。"""


import requests
from urllib.parse import urljoin
import parsel

index_url = 'https://ssr1.scrape.center/'
r = requests.get(index_url)
html = r.text

sel = parsel.Selector(html)
links = sel.css('.item a.name::attr(href)').extract()
print(links)
for link in links:
    detail_url = urljoin(index_url, link)
    r = requests.get(detail_url)
    print(r.text)
    break
