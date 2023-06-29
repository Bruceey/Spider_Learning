import asyncio
from pyppeteer import launch

width, height = 1366, 768


async def main():
    browser = await launch(headless=True, args=[f'--window-size={width},{height}'], ignoreHTTPSErrors=True)
    try:
        page = await browser.newPage()
        await page.evaluateOnNewDocument("""Object.defineProperty(navigator, 'webdriver', {get: () => undefined}""")
        await page.setViewport({'width': width, 'height': height})
        await page.goto('http://www.netbian.com/meinv/')
        j_result1 = await page.J('.list a')
        j_result2 = await page.querySelector('.list a')
        print(j_result1, j_result2, sep='\n')
        jj_result1 = await page.JJ('.list a')
        jj_result2 = await page.querySelectorAll('.list a')
        print(jj_result1, jj_result2, sep='\n')
    finally:
        await browser.close()
        # pass


if __name__ == '__main__':
    asyncio.run(main())
