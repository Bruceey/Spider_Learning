# 抓取多页
import time
from bs4 import BeautifulSoup
import os
import atexit
import asyncio
import aiohttp
# 日志模块
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}
# 并发量
CONCURRENCY = 20
INDEX_URL = 'http://www.netbian.com/meinv/index_{page}.htm'
# 下载的总页数
PAGE_NUMBER = 177
# 在此声明这个变量类型，方便pycharm提示它的相应方法
session: aiohttp.ClientSession


# 程序停止会自动计算下载总时间和下载速度
@atexit.register
def calc_time():
    """
    日志
    :return:
    """
    # 计算下载总时间
    end = time.time()
    duration = end - start
    hour = int(duration / 3600)
    minute = int((duration - hour * 3600) / 60)
    seconds = int(duration - hour * 3600 - minute * 60)

    # 计算下载速度
    size = 0  # 单位是字节
    files = os.listdir("image")
    for file in files:
        try:
            size += os.path.getsize("./image/" + file)
        except Exception as e:
            print(e)
    # 单位是M
    size = size / 1024 / 1024
    # 单位是kb/s
    speed = size * 1024 / duration

    print("\033[31m=" * 100)
    print("一共下载了{}个文件, 大小为{:.2f}M".format(len(files), size))
    print("下载速度为{:.2f} kb/s".format(speed))
    print("耗时{}小时{}分钟{}秒".format(hour, minute, seconds))
    print("=" * 100)


# 请求url，得到html代码
async def get_url(url):
    try:
        async with asyncio.Semaphore(CONCURRENCY):
            logging.info('scraping %s', url)
            async with session.get(url) as response:
                return await response.text('gbk')
    except Exception as e:
        logging.error('error occurred while scraping %s\nthe reason is %s', url, e, exc_info=True)


# 请求url，得到响应的二进制文件
async def get_bytes(url):
    try:
        async with asyncio.Semaphore(CONCURRENCY):
            logging.info('scraping %s', url)
            async with session.get(url) as response:
                return await response.read()
    except Exception as e:
        logging.error('error occurred while scraping %s\nthe reason is %s', url, e, exc_info=True)


# 下载图片
async def download(url):
    print("正在下载链接地址为 %s 的图片" % url)
    # 二进制文件
    content = await get_bytes(url)
    # url的格式 http://img.netbian.com/file/2021/0122/2861bb5516bd41b0dfe79f6a9538892d.jpg
    # 取最后一个"/"之后的字符串作为文件名
    filename = url.split("/")[-1]
    # 拼写完整的图片路径，其中这里的"."表示当前这个文件所在的目录
    file_path = "./image/" + filename
    # 将二进制数据写入文件
    with open(file_path, 'wb') as f:
        f.write(content)


async def run(url):
    html = await get_url(url)
    # 利用BeautifulSoup构建解析器
    soup = BeautifulSoup(html, "lxml")

    # 选取所有的图片所在的块区域
    aElements = soup.select('.list a')
    hrefs = [i["href"] for i in aElements]

    for href in hrefs:
        if href.startswith("/desk"):
            # url2是缩略图对应的链接
            url2 = "http://www.netbian.com" + href

            # 请求缩略图链接得到页面内容
            html2 = await get_url(url2)
            soup2 = BeautifulSoup(html2, "lxml")
            src = soup2.select('.pic img')[0]["src"]
            await download(src)


async def main():
    global session
    # 判断当前目录下是否有image文件夹，没有就创建
    if not os.path.exists("image"):
        os.mkdir("image")

    session = aiohttp.ClientSession(headers=headers)
    scrape_index_tasks = [asyncio.ensure_future(run(INDEX_URL.format(page=page))) for page in range(1, PAGE_NUMBER + 1)]
    scrape_index_tasks[0] = asyncio.ensure_future(run('http://www.netbian.com/meinv/'))
    results = await asyncio.gather(*scrape_index_tasks)
    await session.close()


if __name__ == '__main__':
    start = time.time()
    # asyncio.get_event_loop().run_until_complete(main())
    asyncio.run(main())
