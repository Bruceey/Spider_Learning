import asyncio
import aiohttp
import logging
import json

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

INDEX_URL = 'https://dynamic5.scrape.cuiqingcai.com/api/book/?limit=18&offset={offset}'

PAGE_SIZE = 18
PAGE_NUMBER = 100
CONCURRENCY = 10
session: aiohttp.ClientSession


async def scrape_api(url: str) -> str:
    try:
        async with asyncio.Semaphore(CONCURRENCY):
            logging.info('scraping %s', url)
            async with session.get(url) as response:
                return await response.json()
    except Exception as e:
        logging.error('error occurred while scraping %s\nthe reason is %s', url, e, exc_info=True)


async def scrape_index(page):
    """
    爬取列表页
    :param page:
    :return:
    """
    url = INDEX_URL.format(offset=PAGE_SIZE * (page - 1))
    return await scrape_api(url)


async def main():
    global session
    timeout = aiohttp.ClientTimeout(3)
    session = aiohttp.ClientSession(timeout=timeout, connector=aiohttp.TCPConnector(ssl=False), headers=headers)
    scrape_index_tasks = [asyncio.ensure_future(scrape_index(page)) for page in range(1, PAGE_NUMBER + 1)]
    results = await asyncio.gather(*scrape_index_tasks)
    with open("results.json", 'w') as f:
        json.dump(results, f, ensure_ascii=False)
    # logging.info('results %s', json.dumps(results, ensure_ascii=False, indent=2))
    # await asyncio.wait(scrape_index_tasks)

    await session.close()


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
    # asyncio.run(main())     # python3.7+ 可以简写为这样
