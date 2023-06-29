import scrapy
from urllib.parse import urlencode
import json
from ..items import Images360Item
from pprint import pprint

class ImagesSpider(scrapy.Spider):
    name = 'images'
    allowed_domains = ['image.so.com']
    # start_urls = ['http://image.so.com/']
    MAX_PAGE = 50

    def start_requests(self):
        base_url = "https://image.so.com/zjl?"
        params = {
            'cn': "photograph",
        }
        for page in range(self.MAX_PAGE):
            params['sn'] = page * 30
            url = base_url + urlencode(params)
            yield scrapy.Request(url, callback=self.parse)


    def parse(self, response):
        result = json.loads(response.text)
        imgInfo_list = result.get('list')
        item = Images360Item()
        if imgInfo_list:
            for imgInfo in imgInfo_list:
                item['id'] = imgInfo.get('id')
                item['url'] = imgInfo.get('qhimg_url')
                item['title'] = imgInfo.get('title')
                item['thumb'] = imgInfo.get('qhimg_thumb')
                yield item
