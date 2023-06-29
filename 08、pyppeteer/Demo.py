import pyppeteer
import asyncio
from bs4 import BeautifulSoup


async def main():
    # 启动浏览器
    browser = await pyppeteer.launch(devtools=True, args=['--disable-infobars'])
    try:
        # 新建窗口
        page = await browser.newPage()
        # 请求url
        await page.goto('http://www.netbian.com/meinv/')
        await page.waitForSelector('.list a')
        # 获取源代码
        soup = BeautifulSoup(await page.content(), 'lxml')
        # 选取所有的图片所在的块区域
        aElements = soup.select('.list a')
        hrefs = [i["href"] for i in aElements]
        print(hrefs)
    finally:
        # await browser.close()
        pass


if __name__ == '__main__':
    asyncio.run(main())
