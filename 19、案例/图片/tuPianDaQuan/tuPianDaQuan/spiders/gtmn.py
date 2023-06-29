import scrapy


class GtmnSpider(scrapy.Spider):
    name = 'gtmn'
    allowed_domains = ['www.gtmm.net']
    start_urls = ['http://www.gtmm.net/']

    def parse(self, response):
        pass
