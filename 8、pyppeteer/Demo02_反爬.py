import asyncio
from pyppeteer import launch

width, height = 1366, 768


async def main():
    browser = await launch(headless=False,
                           args=[f'--window-size={width},{height}', ],
                           ignoreHTTPSErrors=True)
    page = await browser.newPage()
    # await page.evaluateOnNewDocument("""Object.defineProperty(navigator, 'webdriver', {get: () => undefined}""")
    await page.setViewport({'width': width, 'height': height})
    await page.goto('https://minsu.dianping.com/')


if __name__ == '__main__':
    asyncio.run(main())
