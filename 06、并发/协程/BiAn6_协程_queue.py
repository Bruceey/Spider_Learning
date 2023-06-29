# 抓取多页
import time
from bs4 import BeautifulSoup
import os
import atexit
import asyncio
import aiohttp
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}
CONCURRENCY = 100
INDEX_URL = 'http://www.netbian.com/meinv/index_{page}.htm'
PAGE_NUMBER = 50
session: aiohttp.ClientSession
page_queue: asyncio.Queue
group_queue: asyncio.Queue
img_queue: asyncio.Queue


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
async def download():
    while True:
        url = await img_queue.get()
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
        img_queue.task_done()


async def get_img_url():
    """
    获取图片的url
    :return:
    """
    while True:
        url = await group_queue.get()
        # 请求缩略图链接得到页面内容
        html = await get_url(url)
        soup = BeautifulSoup(html, "lxml")
        src = soup.select('.pic img')[0]["src"]
        await img_queue.put(src)

        group_queue.task_done()


async def get_group_url():
    """
    获取组图的url，放入group_queue
    :return:
    """
    while True:
        url = await page_queue.get()
        # 拿到每页的url，请求获取组图url
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
                await group_queue.put(url2)
        page_queue.task_done()


async def get_page_url():
    """
    获取每页的url，放入page_queue
    :return:
    """
    for page in range(1, PAGE_NUMBER + 1):
        if page == 1:
            url = 'http://www.netbian.com/meinv/'
        else:
            url = INDEX_URL.format(page=page)
        await page_queue.put(url)


async def main():
    global session, page_queue, group_queue, img_queue
    # 判断当前目录下是否有image文件夹，没有就创建
    if not os.path.exists("image"):
        os.mkdir("image")

    session = aiohttp.ClientSession(headers=headers)
    page_queue = asyncio.Queue()
    group_queue = asyncio.Queue()
    img_queue = asyncio.Queue()
    try:
        task1 = asyncio.ensure_future(get_page_url())
        task2 = asyncio.ensure_future(get_group_url())
        task3 = asyncio.ensure_future(get_img_url())
        task4 = asyncio.ensure_future(download())
        results = await asyncio.gather(task1, task2, task3, task4)

        await page_queue.join()
        await group_queue.join()
        await img_queue.join()

        task1.cancel()
        task2.cancel()
        task3.cancel()
        task4.cancel()
    finally:
        await session.close()


if __name__ == '__main__':
    start = time.time()
    # asyncio.get_event_loop().run_until_complete(main())
    asyncio.run(main())
