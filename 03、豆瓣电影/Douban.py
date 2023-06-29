# 抓取单页(第一页)

import requests
from lxml import etree
import csv



headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

# 保存数据到本地
f =  open("电影数据.csv", "w", encoding="utf-8")
writer = csv.writer(f)
writer.writerow(['电影名', '导演和演员', '细节', '评分', '引述'])



for page in range(10):
    url = 'https://movie.douban.com/top250?start=%d&filter=' % page*25

    # 请求网站得到网页html代码
    response = requests.get(url, headers=headers)
    # print(response.status_code)
    html = response.text
    # print(html)

    # 构建解析树
    tree = etree.HTML(html)

    lis = tree.xpath('//ol[@class="grid_view"]/li')

    # 利用xpath语法提取数据
    for li in lis:
        name = li.xpath('.//span[@class="title"][1]/text()')[0]
        bd = li.xpath('.//div[@class="bd"]/p[1]/text()')
        actor = bd[0].strip()
        detail = bd[1].strip()
        rating_num = li.xpath('.//span[@class="rating_num"]/text()')[0]
        quote = li.xpath('.//p[@class="quote"]/span/text()')[0]

        writer.writerow([name, actor, detail, rating_num, quote])



f.close()