import time

from selenium import webdriver

option = webdriver.ChromeOptions()
option.add_argument('--headless')
browser = webdriver.Chrome()


def parse(browser, url):
    pass


try:
    browser.get("https://list.jd.com/list.html?cat=9987,653,655")
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(2)

    lis = browser.find_elements_by_css_selector('.gl-warp.clearfix>li')
    for li in lis:
        item = li.text.split('\n')
        print(item)
        print(len(item))
        print("="*100)
    print(len(lis))
    pn_next = browser.find_element_by_css_selector('.pn-next').get_attribute('class')
    print(pn_next)
finally:
    # browser.close()
    pass