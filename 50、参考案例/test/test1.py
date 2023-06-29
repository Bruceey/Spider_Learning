# with open('example2.ini', 'r+') as f:
#     f.truncate(9)
#     f.write('我')
#     # f.write('我爱你，美杜莎！\n')
#     # f.write('我爱你，云韵！\n')
#     # f.write('我爱你，雅妃！\n')
#     # f.write('我爱你，纳兰嫣然！\n')
#     # f.write('我爱你，小医仙！\n')
#     # f.write('我爱你，紫妍！\n')
#     # f.write('我爱你，夭夜！\n')
#     # f.seek(0, 0)
#     # print(f.read())

from selenium import webdriver

browser = webdriver.Chrome()
browser.get('https://www.bilibili.com/video/BV1sK4y1x7e1?from=search&seid=12139749496375178581')
print(browser.get_cookies())