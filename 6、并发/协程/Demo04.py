import asyncio


async def func(url):
    print(url)
    await asyncio.sleep(1)


urls = [f"http://www.netbian.com/meinv/index_{page}.htm" for page in range(1, 178)]


async def main():
    tasks = [asyncio.ensure_future(func(url)) for url in urls]
    results = await asyncio.gather(*tasks)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())

# loop = asyncio.get_event_loop()
# urls = [f"http://www.netbian.com/meinv/index_{page}.htm" for page in range(1, 178)]
# urls[0] = 'http://www.netbian.com/meinv/'
#
# tasks = [loop.create_task(func(url)) for url in urls]
# loop.run_until_complete(asyncio.wait(tasks))
