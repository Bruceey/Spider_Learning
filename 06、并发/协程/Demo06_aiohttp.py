import asyncio
import aiohttp

CONCURRENCY = 10
URL = 'https://www.baidu.com'
session: aiohttp.ClientSession


async def scrape_api() -> str:
    try:
        async with asyncio.Semaphore(CONCURRENCY):
            print('scraping', URL)
            async with session.get(URL) as response:
                await asyncio.sleep(1)
                return await response.text()
    except Exception as e:
        print(e)


async def main():
    global session
    timeout = aiohttp.ClientTimeout(1)
    session = aiohttp.ClientSession(timeout=timeout)
    scrape_index_tasks = [asyncio.ensure_future(scrape_api()) for _ in range(10000)]
    # await asyncio.gather(*scrape_index_tasks)
    await asyncio.wait(scrape_index_tasks)
    await session.close()


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
