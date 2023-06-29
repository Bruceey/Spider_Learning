from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# # chrome88之前的版本
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

# chrome88的版本
options = webdriver.ChromeOptions()
# 处理证书错误
options.add_argument('--ignore-certificate-errors')
# 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
options.add_experimental_option('excludeSwitches', ['enable-automation'])
options.add_argument("--disable-blink-features=AutomationControlled")

browser = webdriver.Chrome(options=options)
wait = WebDriverWait(browser, 10)
browser.get("https://music.163.com/#/song?id=190072")
browser.switch_to.frame('contentFrame')
wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.itm')))
print(browser.page_source)