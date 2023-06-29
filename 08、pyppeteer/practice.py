import asyncio
from pyppeteer import launch



async def main():
    browser = await launch(headless=False, ignoreHTTPSErrors=True,)
    try:
        page = await browser.newPage()
        # 打开一个新的选项卡
        page = await browser.newPage()
        await page.goto('http://localhost:8206/')
        await page.click('#fetch_button')
        resp = await page.xpath('//*[@id="content"]')
        text = await (await resp[0].getProperty('textContent')).jsonValue()
        print(text)
    finally:
        await browser.close()


if __name__ == '__main__':
    asyncio.run(main())
