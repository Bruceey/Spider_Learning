import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get("https://www.baidu.com/")
time.sleep(2)
browser.get("https://www.bilibili.com/")
time.sleep(2)
browser.back()
time.sleep(2)
browser.forward()
time.sleep(2)
browser.close()