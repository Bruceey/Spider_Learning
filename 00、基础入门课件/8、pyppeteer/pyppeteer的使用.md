# Python爬虫异步渲染工具pyppeteer的使用

 Python爬虫用到的自动化测试工具Selenium的环境配置比较繁琐，这里介绍一个类似的替代品，叫做 Pyppeteer。pip install pyppeteer安装后即可使用，不用其他环境配置。另外，pyppeteer支持异步操作，selenium仅支持同步操作，故效率更高。

在 Pyppetter 中，实际上它背后也是有一个类似 Chrome 浏览器的 Chromium 浏览器在执行一些动作进行网页渲染。

基本使用如下：

```python
import pyppeteer
import asyncio
from bs4 import BeautifulSoup


async def main():
  	# devtools=True设置每打开一个页面默认打开开发者模式，--disable-infobars关闭收到自动化测试的选项条
    browser = await pyppeteer.launch(devtools=True, args=['--disable-infobars'])
    try:
      	# 打开一个新的选项卡
        page = await browser.newPage()
        await page.goto('http://www.netbian.com/meinv/')
        await page.waitForSelector('.list a')
        soup = BeautifulSoup(await page.content(), 'lxml')
        # 选取所有的图片所在的块区域
        aElements = soup.select('.list a')
        hrefs = [i["href"] for i in aElements]
        print(hrefs)
    finally:
        await browser.close()
        # pass


if __name__ == '__main__':
    asyncio.run(main())
```





## 1、开启浏览器

```
browser = await pyppeteer.launch()
```

launch方法中有很多参数，下面介绍常用的几个：

**headless (bool):**  是否启用 Headless 模式，默认是True，即不启动浏览器界面。我们在写爬虫过程中通常设为False，部署到生产环境才改为Ture。

**devtools (bool)**: 是否为每一个页面自动开启调试工具，默认是 False。如果这个参数设置为 True，那么 headless 参数就会无效，会被强制设置为 False。

**ignoreHTTPSErrors (bool)**: 是否要忽略 HTTPS 的错误，默认是 False。

**args (List[str])**: 在执行过程中可以传入的额外参数。

```text
# 设置浏览器的窗口大小
args=[f'--window-size={width},{height}']
# 关闭收到自动化测试的选项条，见下方截图
args=['--disable-infobars']
```

![image-20210212140501582](/Users/wangrui/Library/Application Support/typora-user-images/image-20210212140501582.png)

**userDataDir (str)**: 即用户数据文件夹，即可以保留一些个性化配置和操作记录。



## 2、标签页选项卡相关操作

**(1) 打开一个新的选项卡：**

```
page = await browser.newPage()
```



**(2) 标签页内容占比设置：**

常和浏览器的大小保持一致，保证内容显示正常

```python
width, height = 1366, 768
browser = await launch(headless=False,
                           args=[f'--window-size={width},{height}'])
page = await browser.newPage()
await page.setViewport({'width': width, 'height': height})
```



**(3)** 访问页面

```
await page.goto('https://www.baidu.com')
# 获得源代码
await page.content()
```



**(4) 等待某个元素加载出来再返回结果**

```python
await page.waitForSelector('.list a')
```

**(5)选取节点**

```python
await page.J(css选择器)   等价于 await page.querySelector(css选择器)   选取单个节点
await page.JJ(css选择器)  等价于 await page.querySelectorAll(css选择器)   选取多个节点
```



**(6) 获取值**

```
# 获取一个
# 获取该节点下的文本信息
# 第一个参数是css选择器，第二个为js代码
await page.querySelectorEval('h2', 'node => node.innerText')

# 获取多个
# 获取该节点的href属性值，返回列表
# 第一个参数是css选择器，第二个为js代码
await page.querySelectorAllEval('.item .name', 'nodes => nodes.map(node => node.href)')
```

