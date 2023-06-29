import requests
import parsel
import csv
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# chrome88的版本
options = webdriver.ChromeOptions()
# 处理证书错误
options.add_argument('--ignore-certificate-errors')
# 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
options.add_experimental_option('excludeSwitches', ['enable-automation'])
options.add_argument("--disable-blink-features=AutomationControlled")

browser = webdriver.Chrome(options=options)

base_font = {
    'uniF489': '0',
    'uniE343': '1',
    'uniF19B': '2',
    'uniF848': '3',
    'uniE5E2': '4',
    'uniE8CD': '5',
    'uniF4EF': '6',
    'uniF88A': '7',
    'uniE137': '8',
    'uniE7A1': '9',
    'uni2E': '.'
}


def getRealNumber(char_raw):
    char_hex_list = ['uni' + '%x'.upper() % ord(i) for i in char_raw]
    result = ''
    for char in char_hex_list:
        result += base_font[char]
    return result


# 保存数据到本地
with open("电影数据.csv", "w", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(['电影名', '评分', '评分人数', '累计票房'])

    browser.get('https://maoyan.com/films?showType=1')
    wait = WebDriverWait(browser, 10)
    if "猫眼验证中心" in browser.page_source:
        wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.movie-item>a')))

    html = browser.page_source
    sel = parsel.Selector(html)
    movie_detail_urls = sel.css('.movie-item>a::attr(href)').extract()
    print(movie_detail_urls)
    for url in movie_detail_urls:
        movie_detail_url = 'https://maoyan.com' + url

        browser.get(movie_detail_url)
        if "猫眼验证中心" in browser.page_source:
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.index-left.info-num>span')))

        sel = parsel.Selector(browser.page_source)
        # 电影名字
        name = sel.css('h1::text').get()
        # 获取评分
        score_raw = sel.css('.index-left.info-num>span::text').get()
        score = '暂无'
        if score_raw:
            score = getRealNumber(score_raw)
        # 评分人数
        personNum_raw = sel.css('.score-num>span::text').get()
        personNum = '暂无'
        if personNum_raw:
            if '万' in personNum_raw:
                personNum = getRealNumber(personNum_raw[:-1]) + personNum_raw[-1]
            else:
                personNum = getRealNumber(personNum_raw)
        # 票房
        ticket_raw = sel.css('.movie-index-content.box>span.stonefont::text').get()
        unit = sel.css('.movie-index-content.box>span.unit::text').get()
        ticket = getRealNumber(ticket_raw) + unit
        writer.writerow([name, score, personNum, ticket])
