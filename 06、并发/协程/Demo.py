import requests
import logging
import time

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')

TOTAL_NUMBER = 100
BASE_URL = 'http://www.netbian.com/meinv/index_{page}.htm'

start_time = time.time()
for page in range(2, TOTAL_NUMBER + 2):
    url = BASE_URL.format(page=page)
    logging.info('scraping %s', url)
    response = requests.get(url, headers=headers)
end_time = time.time()
logging.info('total time %s seconds', end_time - start_time)