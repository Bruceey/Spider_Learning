import sys
import requests
import parsel
from pprint import pprint
# sys.getsizeof('a')
#
# with open("/Users/wangrui/PycharmProjects/Spider/19、案例/图片/绯月樱2-Cherry/绯月樱2-Cherry0.jpg", 'rb') as f:
#     c = f.read()
#     print(sys.getsizeof(c))

r = requests.get("http://www.meibang88.com/zhongguo/6530.html")
html = r.text

sel = parsel.Selector(html)
imgs = sel.css(".content>img::attr(src)").extract()
print(len(imgs))
pprint(imgs)