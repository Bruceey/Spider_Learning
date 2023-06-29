import asyncio
import aiohttp


async def main():
    data = {'name': 'germeey', 'age': 25}
    async with aiohttp.ClientSession() as session:
        async with session.post('https://httpbin.org/post', data=data) as response:
            print('status', response.status)
            print('body', await response.text())
            print('bytes', await response.read())
            print('json', await response.json())


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
