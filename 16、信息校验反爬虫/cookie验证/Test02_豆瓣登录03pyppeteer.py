import asyncio
from pyppeteer import launch

url = 'https://www.douban.com/'
width, height = 1366, 768


async def main():
    browser = await launch(devtools=True,
                           args=[f'--window-size={width},{height}', '--disable-blink-features=AutomationControlled', '--disable-infobars'],
                           ignoreHTTPSErrors=True)
    page = await browser.newPage()
    await page.setViewport({"width": width, "height": height})
    await page.goto(url)
    await page.waitFor('.login>iframe')
    frame = page.frames[0]
    # 找到账户密码登录框
    print(await frame.content())
    await frame.click('.account-tab-account')
    # 输入账户和密码
    await frame.type('#username', '你的用户名')
    await frame.type("#password", "你的密码")
    await frame.click('.account-form-field-submit')
    await page.waitFor('.nav-user-account')
    print(await page.content())
    print(await page.cookies())
    await browser.close()


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())