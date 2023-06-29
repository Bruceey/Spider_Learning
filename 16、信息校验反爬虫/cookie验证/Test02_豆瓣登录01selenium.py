from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# 1、利用selenium模拟登录获取cookie
# chrome88的版本
options = webdriver.ChromeOptions()
# 处理证书错误
options.add_argument('--ignore-certificate-errors')
# 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
options.add_experimental_option('excludeSwitches', ['enable-automation'])
options.add_argument("--disable-blink-features=AutomationControlled")
browser = webdriver.Chrome(options=options)

url = 'https://www.douban.com/'
browser.get(url)

wait = WebDriverWait(browser, 10)
iframe = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".login>iframe")))
browser.switch_to.frame(iframe)
# 找到账户密码登录框
password_login_switch = browser.find_element_by_css_selector('.account-tab-account')
password_login_switch.click()
# 输入账户和密码
username_input = browser.find_element_by_id('username')
username_input.send_keys('你的用户名')
password_input = browser.find_element_by_id('password')
password_input.send_keys('你的密码')
submit = browser.find_element_by_css_selector('.account-form-field-submit')
submit.click()
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".nav-user-account")))
print(browser.page_source)
print(browser.get_cookies())
# browser.close()