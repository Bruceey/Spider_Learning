from selenium import webdriver
import time

browser = webdriver.Chrome()
try:
    browser.get("https://www.baidu.com/")
    # 找到input搜索框
    input = browser.find_element_by_id('kw')
    # 输入Python
    input.send_keys("Python")
    time.sleep(1)
    # 清除搜索框内容
    input.clear()
    input.send_keys("Javaafaagsbbd")
    # 找到搜索按钮
    button = browser.find_element_by_id('su')
    # 提交搜索
    button.click()
finally:
	# browser.close()
	pass
