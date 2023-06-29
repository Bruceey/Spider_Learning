from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

browser = webdriver.Chrome()
browser.get("https://www.bilibili.com/")
browser.get("https://www.baidu.com/")
input = browser.find_element_by_id('kw')
print(input.get_attribute("class"))
input.send_keys("Python")
input.send_keys(Keys.ENTER)
wait = WebDriverWait(browser, 10)
wait.until(EC.presence_of_element_located((By.ID, "content_left")))
# print(browser.current_url)
# print(browser.get_cookies())
print(browser.page_source)
