# Define here the models for your spider middleware
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import signals
import random
import requests

# useful for handling different item types with a single interface
from itemadapter import is_item, ItemAdapter



class UserAgentDownloaderMiddleware:
    def __init__(self, user_agent_list):
        self.user_agent_list = user_agent_list

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls(crawler.settings.get('USER_AGENT_LIST'))
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        ua = random.choice(self.user_agent_list)
        spider.logger.info("User-Agent: %s" % ua)
        request.headers['User-Agent'] = ua
        return None

    def process_response(self, request, response, spider):
        # Called with the response returned from the downloader.

        # Must either;
        # - return a Response object
        # - return a Request object
        # - or raise IgnoreRequest
        return response

    def process_exception(self, request, exception, spider):
        # Called when a download handler or a process_request()
        # (from other downloader middleware) raises an exception.

        # Must either:
        # - return None: continue processing this exception
        # - return a Response object: stops process_exception() chain
        # - return a Request object: stops process_exception() chain
        pass

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)



class ProxyDownloaderMiddleware:
    def process_request(self, request, spider):
        proxy = requests.get("http://127.0.0.1:5010/get/").json().get("proxy")
        request.meta['proxy'] = f"http://{proxy}"
        spider.logger.info(f"所选代理ip为{proxy}")
        return None