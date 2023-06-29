# 爬取单页

import requests
from lxml import etree
from urllib import request


headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}


# html = requests.get("http://www.netbian.com/meinv/", headers=headers).text
html = requests.get("http://www.netbian.com/meinv/", headers=headers).content.decode("gbk")
# print(html)
tree = etree.HTML(html)
data = tree.xpath('//div[@class="list"]')[0]
hrefs = data.xpath('//li/a/@href')

for href in hrefs:
    if href.startswith("/desk"):
        url = "http://www.netbian.com" + href
        picture_html = requests.get(url, headers = headers).content.decode('gbk')
        picture_tree = etree.HTML(picture_html)
        url2 = picture_tree.xpath('//div[@class="pic"]//img/@src')[0]

        filename = url2.split("/")[-1]
        request.urlretrieve(url2, filename)








