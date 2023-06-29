from selenium import webdriver
import time
import asyncio
from pyppeteer import launch


def run1():
    browser = webdriver.Chrome()
    browser.get('http://localhost/features/webdriver.html')
    browser.find_element_by_css_selector('.btn.btn-primary.btn-lg').click()
    elements = browser.find_element_by_css_selector('#content')
    time.sleep(1)
    print(elements.text)
    browser.close()


def run1_2():
    # chrome88的版本
    options = webdriver.ChromeOptions()
    # 处理证书错误
    options.add_argument('--ignore-certificate-errors')
    # 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
    options.add_experimental_option('excludeSwitches', ['enable-automation'])
    options.add_argument("--disable-blink-features=AutomationControlled")
    browser = webdriver.Chrome(options=options)
    browser.get('http://localhost/features/webdriver.html')
    browser.find_element_by_css_selector('.btn.btn-primary.btn-lg').click()
    elements = browser.find_element_by_css_selector('#content')
    time.sleep(1)
    print(elements.text)
    browser.close()


async def run2():
    browser = await launch()
    page = await browser.newPage()
    await page.goto('http://localhost/features/webdriver.html')
    await page.click('.btn.btn-primary.btn-lg')
    await asyncio.sleep(1)
    await page.screenshot({'path': 'webfriver.png'})
    await browser.close()


if __name__ == '__main__':
    # run1()
    run1_2()
    # asyncio.run(run2())
