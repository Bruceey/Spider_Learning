from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def get_broswer() -> webdriver:
    options = webdriver.ChromeOptions()
    # 处理证书错误
    options.add_argument('--ignore-certificate-errors')
    # 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
    options.add_experimental_option('excludeSwitches', ['enable-automation'])
    options.add_argument("--disable-blink-features=AutomationControlled")
    # 添加代理
    # proxy = 'host:port'
    # options.add_argument('--proxy-server=http://')
    browser = webdriver.Chrome(options=options)
    return browser


browser = get_broswer()
browser.get('http://localhost:8206/')
button = browser.find_element_by_id('fetch_button')
button.click()
content = browser.find_element_by_css_selector("#content").text
print(content)
# browser.close()