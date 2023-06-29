import asyncio
from pyppeteer import launch



async def main():
    browser = await launch(headless=False)
    try:
        page = await browser.newPage()
        # 打开一个新的选项卡
        page = await browser.newPage()
        await page.goto('http://www.netbian.com/meinv/')
        # 打开第二个选项卡
        page = page = await browser.newPage()
        await page.goto('https://www.baidu.com/')
        # 得到所有选项卡
        pages = await browser.pages()
        print(pages)
        page1 = pages[1]
        await page1.bringToFront()
        await asyncio.sleep(100)
    finally:
        await browser.close()


if __name__ == '__main__':
    asyncio.run(main())
