from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_experimental_option('useAutomationExtension', False)
options.add_experimental_option('excludeSwitches', ['enable-automation'])
browser = webdriver.Chrome()
browser.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
    "source": """
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    })
  """
})

browser.get('https://music.163.com/')
wait = WebDriverWait(browser, 10)
input_label = wait.until(EC.presence_of_element_located((By.ID, 'srch')))
# name = input("请输入您想要搜索的歌曲名字：")
name = '黄昏'
input_label.send_keys(name)
input_label.send_keys(Keys.ENTER)
time.sleep(3)

# 显式等待
wait = WebDriverWait(browser, 10)
print(browser.page_source)
song_link = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.item.f-cb.h-flag .text>a')))
href = song_link.get_attribute('href')
print(href)