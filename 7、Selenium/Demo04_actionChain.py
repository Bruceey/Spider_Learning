from selenium import webdriver
from selenium.webdriver import ActionChains

browser = webdriver.Chrome()
browser.get("https://www.runoob.com/try/try.php?filename=jqueryui-api-droppable")
browser.switch_to.frame("iframeResult")
source = browser.find_element_by_id("draggable")
target = browser.find_element_by_id("droppable")
actions = ActionChains(browser)
actions.drag_and_drop(source, target).perform()

