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
# # chrome88之前的版本(版本一)
# options = webdriver.ChromeOptions()
# options.add_experimental_option('useAutomationExtension', False)
# options.add_experimental_option('excludeSwitches', ['enable-automation'])
# browser = webdriver.Chrome(options=options)
# browser.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
#     "source": """
#     Object.defineProperty(navigator, 'webdriver', {
#       get: () => undefined
#     })
#   """
# })

# chrome88的版本(版本二)
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
cookies_raw = browser.get_cookies()
browser.close()
cookies = {}
for cookie in cookies_raw:
    for item in cookie.items():
        cookies[str(item[0])] = str(item[1])
cookies[cookies['name']] = cookies['value']
del cookies['name']
del cookies['value']
print(cookies)

response = requests.get('https://login2.scrape.center/', headers=headers, cookies=cookies)
print(response.text)
