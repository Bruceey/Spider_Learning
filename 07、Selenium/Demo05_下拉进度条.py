from selenium import webdriver
import time

browser = webdriver.Chrome()
browser.get("https://www.gushiwen.org/")
time.sleep(2)
browser.execute_script('window.scrollTo(0, document.body.scrollHeight)')
browser.execute_script('alert("To Bottom")')

