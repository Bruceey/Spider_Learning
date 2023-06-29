
# from urllib.request import urlretrieve
# from fontTools.ttLib import TTFont
# font = TTFont('/Users/wangrui/Downloads/下载1.woff')
# font.saveXML('实习僧字体.xml')


import os
dir = '/Users/wangrui/Desktop/爬虫参考/千锋教育爬虫'
os.chdir(dir)
files = os.listdir(dir)
for file in files:
    os.renames(file, file.replace('Python爬虫+反爬虫实战【数据爬取+数据解析+scrapy+selenium+反爬虫】 - ', ''))
