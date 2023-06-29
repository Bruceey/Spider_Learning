# 爬取多页
import requests  # 用于模拟浏览器发送请求的库
from lxml import etree  # 解析响应内容的库，构建树结构，便于xpath语法索引
from urllib import request  # 下载图片时用到

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}

# 此处控制要爬取的页码总数，网站目前共有177页，所以此处最大写178
for page in range(1, 11):
    # 第一页是这种url：http://www.netbian.com/meinv/，
    # 其他页都是http://www.netbian.com/meinv/index_%d.htm的形式
    if page == 1:
        page_url = "http://www.netbian.com/meinv/"
    else:
        page_url = "http://www.netbian.com/meinv/index_%d.htm" % page
    # 网站的charset=“gbk”
    html = requests.get(page_url, headers=headers).content.decode("gbk")

    # 利用lxml的etree.HTML解析html，构建树结构
    tree = etree.HTML(html)
    # 利用xpath语法提取当前缩略图下图片的url
    data = tree.xpath('//div[@class="list"]')[0]
    hrefs = data.xpath('//li/a/@href')  # [/desk/xxxxx.htm，/desk/xxxxx.htm]形式

    # 遍历所有的缩略图url
    for href in hrefs:
        if href.startswith("/desk"):
            # 拼接完整的缩略图url地址
            url = "http://www.netbian.com" + href
            # 请求缩略图url地址，之后解析得到1080P图片地址
            picture_html = requests.get(url, headers=headers).content.decode('gbk')
            picture_tree = etree.HTML(picture_html)
            # url2 = picture_tree.xpath('//td/a/@href')
            url2 = picture_tree.xpath('//div[@class="pic"]//img/@src')[0]

            # 定义图片名称，下载图片
            filename = url2.split("/")[-1]
            request.urlretrieve(url2, filename)