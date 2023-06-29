import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get("https://www.baidu.com/")
# 获取cookies
print(browser.get_cookies())
# 添加cookie
browser.add_cookie({"name": '小霸王'})
print(browser.get_cookies())
# 删除所有cookies
browser.delete_all_cookies()
print(browser.get_cookies())
time.sleep(2)
browser.close()