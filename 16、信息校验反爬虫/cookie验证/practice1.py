import requests
from lxml import etree

headers = {
    "user-agent": 'fwjffoython',
    'cookie': 'isfirst=789kq7uc1pp4c'
}
url = 'http://172.16.211.4:8207/verify/cookie/content.html'

r = requests.get(url, headers=headers)
print(r.status_code)
html = etree.HTML(r.content)
title = ', '.join(html.xpath('//h1//text()'))
content = '\n'.join(html.xpath('//div[@class="left col-md-10"]/p//text()'))
print(title)
print(content)