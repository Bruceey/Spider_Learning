import time
from selenium import webdriver

option = webdriver.ChromeOptions()
option.add_argument('--headless')
browser = webdriver.Chrome(options=option)
browser.get("https://www.baidu.com/")
print(browser.page_source)

browser.close()