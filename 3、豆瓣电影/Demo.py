from lxml import etree

with open("豆瓣电影.html") as f:
    html = f.read()

    tree = etree.HTML(html)
