# 3、Xpath数据解析之豆瓣电影抓取项目



![爬虫封面3](./img/爬虫封面3.jpg)



网页数据解析常用的有三种方式：**xpath语法、css选择器、正则表达式**。三者中学习难易程度xpath和css相当，正则表达式较难。提取效率正则表达式最高，xpath其次，css效率最低。





今天我们主要学习xpath语法，并结合之前所学的requests库完成一个实战项目--**《豆瓣电影TOP 250》**的电影数据抓取。



![豆瓣电影top250](./img/豆瓣电影top250.png)

豆瓣电影TOP 250



# 一、Xpath语法

### **1、标签的提取**

**（1）基本概述**

XPath ， 全称 XML Path Language ，即 XML 路径语言，它是一门在 XML 文档中查找信息的语言。 它最初是用来搜寻 XML 文档的，但是它同样适用于 HTML 文档的搜索。



**（2）xpath常用规则**

```
表达式                 描述 

nodename              选取此节点的所有子节点 
/                     从当前节点选取直接子节点
//										从当前节点选取子孙节点
.											选取当前节点
..										选取当前节点的父节点
@											选取属性
```

xpath节点选取举例：

```
html//div[@class="article"]/..
```



**（3）带谓语的xpath语法**

```
路径表达式	                     结果

/bookstore/book[1]	          选取属于 bookstore 子元素的第一个 book 元素。
/bookstore/book[last()]	      选取属于 bookstore 子元素的最后一个 book 元素。
/bookstore/book[last()-1]	    选取属于 bookstore 子元素的倒数第二个 book 元素。
/bookstore/book[position()<3]	选取最前面的两个属于 bookstore 元素的子元素的 book 元素。
/title[@lang]	                选取所有拥有名为 lang 的属性的 title 元素。
/title[@lang='eng']	          选取所有 title 元素，且这些元素拥有值为 eng 的 lang 属性。
```

另外，还有一个可能常用的xpath函数**contains**，其用法为：

```
# 选取class属性值中包含“pic”的li标签
//li[contains(@class, "pic")
```

**提示：**

对于标签的提取，还有很多方式。这里仅仅列举了常用的几种，这些足以应付常见的项目。更多提取方式请参考**w3school**



### **2、属性值和文本内容提取**

```
表达式           举例

@               //div[@class="pic"]/a/@href   
text()          //span[@class="rating_num"]/text()
```



### **3、Python中xpath语法的使用**

**（1）lxml解析库**

Python的第三方库，利用C语言编写。用于构建xpath语法解析树，使用方法很简单：

```
from lxml import etree

# 构建解析树
tree = etree.HTML(html)
```



**（2）使用xpath语法**

```
# 获取li标签
li = tree.xpath('//ol[@class="grid_view"]/li')[0]
# lis可以继续使用xpath语法，比如获取当前li标签下span标签内部的文本信息
name = li.xpath('.//span[@class="title"][1]/text()')[0]
```

**提示：**

在文本提取中常用的字符串函数

```
str.strip()函数       去除字符串头部和尾部的空格和换行符
```



# 二、豆瓣电影Top 250项目

### **1、任务**

获取每部电影的**'电影名', '导演和演员', '细节', '评分', '引述'。**



### **2、抓取步骤**

分三个步骤：**利用requests库模拟浏览器发送请求、数据提取、数据保存到本地**。



### **3、代码展示**

抓取单页数据的完整代码：

```
# 抓取单页

import requests
from lxml import etree
import csv

url = 'https://movie.douban.com/top250?start=0&filter='

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

# 请求网站得到网页html代码
response = requests.get(url, headers=headers)
# print(response.status_code)
html = response.text
# print(html)

# 构建解析树
tree = etree.HTML(html)
lis = tree.xpath('//ol[@class="grid_view"]/li')

# 保存数据到本地
f =  open("电影数据.csv", "a", encoding="utf-8")
writer = csv.writer(f)
writer.writerow(['电影名', '导演和演员', '细节', '评分', '引述'])

# 利用xpath语法提取数据
for li in lis:
    name = li.xpath('.//span[@class="title"][1]/text()')[0]
    bd = li.xpath('.//div[@class="bd"]/p[1]/text()')
    actor = bd[0].strip()
    detail = bd[1].strip()
    rating_num = li.xpath('.//span[@class="rating_num"]/text()')[0]
    quote = li.xpath('.//p[@class="quote"]/span/text()')[0]
    writer.writerow([name, actor, detail, rating_num, quote])
    
f.close()
```

抓取多页数据的完整代码：

```
# 抓取多页

import requests
from lxml import etree
import csv


headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

# 保存数据到本地
f =  open("电影数据.csv", "a", encoding="utf-8")
writer = csv.writer(f)
writer.writerow(['电影名', '导演和演员', '细节', '评分', '引述'])

for page in range(0, 226, 25):
    # 请求网站得到网页html代码
    url = 'https://movie.douban.com/top250?start=%d&filter=' % page
    response = requests.get(url, headers=headers)
    # print(response.status_code)
    html = response.text
    # print(html)

    # 构建解析树
    tree = etree.HTML(html)
    lis = tree.xpath('//ol[@class="grid_view"]/li')

    # 利用xpath语法提取数据
    for li in lis:
        name = li.xpath('.//span[@class="title"][1]/text()')[0]
        bd = li.xpath('.//div[@class="bd"]/p[1]/text()')
        actor = bd[0].strip()
        detail = bd[1].strip()
        rating_num = li.xpath('.//span[@class="rating_num"]/text()')[0]
        quote = li.xpath('.//p[@class="quote"]/span/text()')
        quote = quote[0] if quote else ''

        # 写入本地
        writer.writerow([name, actor, detail, rating_num, quote])

f.close()
```