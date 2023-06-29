import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}
url = 'https://login2.scrape.center/login?next=/'
# 1、利用selenium模拟登录获取cookie
# chrome88的版本
options = webdriver.ChromeOptions()
# 处理证书错误
options.add_argument('--ignore-certificate-errors')
# 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
options.add_experimental_option('excludeSwitches', ['enable-automation'])
options.add_argument("--disable-blink-features=AutomationControlled")
browser = webdriver.Chrome(options=options)

browser.get(url)
wait = WebDriverWait(browser, 10)
button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input.el-button")))

inputs = browser.find_elements_by_css_selector('.el-input__inner')
inputs[0].send_keys('admin')
inputs[1].send_keys('admin')
button.click()
coolies = browser.get_cookies()
print(coolies)

# response = requests.get('https://login2.scrape.center/',
#                         cookies=cookies, headers=headers)
# print(response.text)
