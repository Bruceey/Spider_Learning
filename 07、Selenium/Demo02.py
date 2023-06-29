from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

browser = webdriver.Chrome()
try:
    browser.get("https://www.gushiwen.org/")
    divs = browser.find_elements_by_css_selector('.left .cont')
    for div in divs:
        print(type(div.text))
    aTags = browser.find_elements_by_css_selector('.cont>p:first-of-type>a')
    for a in aTags:
        print(a.get_attribute("href"))
#     wait = WebDriverWait(browser, 10)
#     wait.until(EC.presence_of_element_located((By.ID, "content_left")))
#     print(browser.current_url)
#     print(browser.get_cookies())
#     print(browser.page_source)
finally:
    # browser.close()
    pass