from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from io import BytesIO
from PIL import Image
import time
from kuaishibie import base64_api


login_url = 'https://passport.bilibili.com/login'

options = webdriver.ChromeOptions()
# 处理证书错误
options.add_argument('--ignore-certificate-errors')
# 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
options.add_experimental_option('excludeSwitches', ['enable-automation'])
options.add_argument("--disable-blink-features=AutomationControlled")
# options.add_argument('headless')
browser = webdriver.Chrome(options=options)
# browser.maximize_window()

browser.get(login_url)

wait = WebDriverWait(browser, 10)
username_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#login-username')))
username_input.send_keys("你的用户名")
password_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#login-passwd')))
password_input.send_keys("你的密码")

# 点击登录
browser.find_element_by_css_selector('.btn.btn-login').click()

# 等待验证码弹出
captcha_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.geetest_holder.geetest_silver')))
# captcha_element = browser.find_element_by_css_selector('.geetest_holder.geetest_silver')
time.sleep(1.5)
loc = captcha_element.location
size = captcha_element.size
left, top, right, bottom = loc['x'], loc['y'], loc['x'] + size['width'], loc['y'] + size['height']

# 设置浏览器窗口宽高
width = browser.execute_script("return document.documentElement.scrollWidth")
height = browser.execute_script("return document.documentElement.scrollHeight")
browser.set_window_size(width, height)

# 截首页图方式一、保存本地的形式
# browser.save_screenshot("b站首页.png")
# screenshot = Image.open("b站首页.png")
# captcha = screenshot.crop((left, top, right, bottom))
# captcha.save("captcha.png")

# 截首页图方式二、流对象
screenshot = browser.get_screenshot_as_png()
screenshot = Image.open(BytesIO(screenshot))
captcha = screenshot.crop((left, top, right, bottom))
captcha.save("captcha.png")

try:
    result_str = base64_api('你的用户名', '你的密码', 'captcha.png')
    result_list = result_str.split("|")
    for result in result_list:
        x = result.split(',')[0]
        y = result.split(',')[1]
        ActionChains(browser).move_to_element_with_offset(captcha_element, int(x), int(y)).click().perform()
        time.sleep(.3)

    print(result_str)
except Exception as e:
    print(result_str)
    print(e)
# 点击确认
browser.find_element_by_css_selector('.geetest_commit').click()
time.sleep(1)
# 再次点击登录
browser.find_element_by_css_selector('.btn.btn-login').click()