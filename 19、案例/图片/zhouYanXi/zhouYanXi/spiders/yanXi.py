import scrapy
from scrapy_redis.spiders import RedisSpider
import re
from ..items import ZhouyanxiItem


class YanxiSpider(RedisSpider):
    name = 'yanXi'
    allowed_domains = ['mzitu.com']

    # start_urls = ['https://www.mzitu.com/search/%E5%91%A8%E5%A6%8D%E5%B8%8C/']

    def parse(self, response):
        pass
        lis = response.css('#pins>li')
        for li in lis:
            title = li.css("li>a>img::attr(alt)").get()
            title = re.sub(r'[\\/:*?"<>|]', '', title)
            group_href = li.css("li>a::attr(href)").get()
            yield scrapy.Request(group_href, callback=self.parse_current_img, meta={'title': title})
        # 获取下一页
        next_page = response.css('.next::attr(href)').get()
        if next_page:
            yield scrapy.Request(next_page, callback=self.parse)

    def parse_current_img(self, response):
        title = response.meta['title']
        img_src = response.css('.blur::attr(src)').get()
        yield ZhouyanxiItem(image_urls=[img_src], file_dir=title)

        # 获取下一张图片
        next_img_desc = response.xpath('//div[@class="pagenavi"]/a[last()]/span/text()').get()
        if "下一页" in next_img_desc:
            next_img = response.xpath('//div[@class="pagenavi"]/a[last()]/@href').get()
            yield scrapy.Request(next_img, callback=self.parse_current_img, meta={'title': title})
