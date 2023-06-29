import requests
import parsel
import csv
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from pprint import pprint
import re
from urllib.request import urlretrieve
from fontTools.ttLib import TTFont
import hashlib

# chrome88的版本
options = webdriver.ChromeOptions()
# 处理证书错误
options.add_argument('--ignore-certificate-errors')
# 修改windows.navigator.webdriver，防机器人识别机制，selenium自动登陆判别机制
options.add_experimental_option('excludeSwitches', ['enable-automation'])
options.add_argument("--disable-blink-features=AutomationControlled")

browser = webdriver.Chrome(options=options)

base_font = {
    'uniEA1A': '0',#
    'uniF808': '1',#
    'uniF479': '2',#
    'uniE298': '3',#
    'uniF27B': '4',#
    'uniE7EC': '5',#
    'uniE610': '6',#
    'uniE334': '7',#
    'uniE561': '8',#
    'uniE5DD': '9',#
}


def getRealNumber(char_raw):
    """

    :param char_raw: 原始字符串
    :return:
    """
    char_hex_list = ['uni' + '%x'.upper() % ord(i) for i in char_raw]
    result = ''
    for char in char_hex_list:
        result += base_font[char]
    return result


# 保存数据到本地
# with open("专业电影数据.csv", "w", encoding="utf-8") as f:
#     writer = csv.writer(f)
#     writer.writerow(['电影名', '评分', '评分人数', '累计票房'])
# while True:
#     browser.get('http://piaofang.maoyan.com/dashboard/movie')
#     wait = WebDriverWait(browser, 10)
#     wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.moviename-td')))
#     html = browser.page_source
#     browser.save_screenshot("screen01.png")
#
#     # 找到反爬字体并下载下来
#     font_url = "http:" + re.search(r',url\("(//.+?woff)"\)', html, re.S).group(1)
#     font_name = font_url.split('/')[-1]
#     if font_name != "9fc50aa7.woff":
#         continue
#     urlretrieve(font_url, font_name)
#     browser.close()
#     break

browser.get('http://piaofang.maoyan.com/dashboard/movie')
wait = WebDriverWait(browser, 10)
wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.moviename-td')))
html = browser.page_source
browser.save_screenshot("screen01.png")

# 找到反爬字体并下载下来
font_url = "http:" + re.search(r',url\("(//.+?woff)"\)', html, re.S).group(1)
font_name = font_url.split('/')[-1]
urlretrieve(font_url, font_name)
browser.close()

# 提取电影名字
sel = parsel.Selector(html)
names = sel.css('.moviename-td::attr("title")').extract()
# 编号
index = list(range(1, len(names)+1))
# 提取综合票房
tickets_raw = sel.css('.realtime.mtsi-num::text').extract()
# 破解字体反爬
font1 = TTFont('9fc50aa7.woff')
uni1_list = font1.getGlyphOrder()[2:]
font2 = TTFont(font_name)
uni2_list = font2.getGlyphOrder()[2:]
for uni2 in uni2_list:
    for uni1 in uni1_list:
        hash1 = hashlib.md5(font1['glyf'].glyphs.get(uni1).data).hexdigest()
        hash2 = hashlib.md5(font2['glyf'].glyphs.get(uni2).data).hexdigest()
        if hash1 == hash2:
            print(uni2, base_font[uni1])

ticket_list = []
for ticket_raw in tickets_raw:
    point_pos = ticket_raw.index('.')
    a = ticket_raw[:point_pos]
    b = ticket_raw[point_pos+1:-1]
    ticket_list.append(getRealNumber(a) + '.' + getRealNumber(b) + '万')


pprint(list(zip(index, names, ticket_list)))
print('=' * 100)
print(html)





        # writer.writerow([name, score, personNum, ticket])
