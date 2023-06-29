import asyncio
from pyppeteer import launch



async def main():
    browser = await launch(headless=False, ignoreHTTPSErrors=True)
    try:
        page = await browser.newPage()
        # 打开一个新的选项卡
        page = await browser.newPage()
        await page.goto('https://dynamic2.scrape.cuiqingcai.com/page/1')
        await asyncio.sleep(100)
    finally:
        await browser.close()


if __name__ == '__main__':
    asyncio.run(main())
