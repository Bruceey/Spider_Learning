import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get("https://www.baidu.com/")
time.sleep(2)
browser.execute_script('window.open()')
print(browser.window_handles)
browser.switch_to.window(browser.window_handles[1])
browser.get("https://www.bilibili.com/")
time.sleep(2)
browser.execute_script('window.close()')
browser.switch_to.window(browser.window_handles[0])
print(browser.page_source)

browser.close()