from urllib.request import urlretrieve
from urllib.parse import urljoin
import requests
import parsel
import re
import bisect
from pprint import pprint

url = 'http://172.16.211.4/confusion/food.html'
r = requests.get(url)
html = r.text
selector = parsel.Selector(r.text)


food_css = selector.re_first(r'<link href="([^h].+?)" rel="stylesheet">')
food_css_url = urljoin(url, food_css)
print(food_css_url)
# 找到css文件后获取所有class属性值对应的坐标
r2 = requests.get(food_css_url)
html2 = r2.text
# [('vhk08k', '274', '141'), ...
classValue_list = re.findall(r'\.(\w*?) {.*?-(\d+?)px -(\d+?)px', html2, re.S)[:-1]

# 找到svg的url，建立class的值与字符的映射
svg_url = re.search(r'background-image: url\((.*?)\)', html2).group(1)
svg_url = urljoin(food_css_url, svg_url)
svg_html = requests.get(svg_url).text
sel3 = parsel.Selector(svg_html)
textY_list = sel3.css('text::attr("y")').extract()
textY_list = [int(x) for x in textY_list]
textValue_list = sel3.css('text::text').extract()
# 将html中相应代码替换
for classValue in classValue_list:
    y_index = bisect.bisect_left(textY_list, int(classValue[-1]))
    x_index = int(classValue[1]) // 14
    html = html.replace(f'<d class="{classValue[0]}"></d>', textValue_list[y_index][x_index])

selector = parsel.Selector(html)
phone = selector.css('.more *::text').extract()
print(phone)