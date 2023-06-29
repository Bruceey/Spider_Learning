from selenium import webdriver

browser = webdriver.Chrome()

browser.get("https://www.gushiwen.org/")
browser.implicitly_wait(10)
div = browser.find_element_by_css_selector('.lefet .cont')
print(div.text)

browser.close()