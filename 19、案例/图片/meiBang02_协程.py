import re
import os
import random
import sys
import parsel
import asyncio
import aiohttp
import logging
import aiofiles
import requests

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
user_agent = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2919.83 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2866.71 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux i686 on x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2820.59 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2762.73 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:77.0) Gecko/20100101 Firefox/77.0',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:39.0) Gecko/20100101 Firefox/75.0'
]
headers = {
    'User-Agent': None,
}

group_url = "http://www.meibang88.com/zhongguo/6405.html"

dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(dir)
image_dir = os.path.join(dir, 'image', "陆宣萱2")
event1 = asyncio.Event()  # 事件对象
event2 = asyncio.Event()  # 事件对象
CONCURRENCY = 10
session: aiohttp.ClientSession
imgTitleSrc_queue = asyncio.Queue()
imgTitleSrcContent_queue = asyncio.Queue()


def make_album():
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)


def get_proxy():
    return requests.get("http://127.0.0.1:5010/get/").json()


def delete_proxy(proxy):
    requests.get("http://127.0.0.1:5010/delete/?proxy={}".format(proxy))


async def get_data_byteStream_api(url):
    try:
        headers['User-Agent'] = random.choice(user_agent)
        proxy = get_proxy().get("proxy")
        async with asyncio.Semaphore(CONCURRENCY):
            logging.info('scraping %s', url)
            async with session.get(url, headers=headers, proxy=f"http://{proxy}") as response:
                return await response.read()
    except aiohttp.ClientConnectionError or aiohttp.ClientPayloadError as e:
        logging.error(f'当前图片{url}获取失败，\n原因是{e}，\n重新获取中', exc_info=True)
        return await get_data_byteStream_api(url)


async def get_html_api(url):
    content = await get_data_byteStream_api(url)
    return content.decode('utf8')


async def get_img_src(html):
    sel = parsel.Selector(html)
    imgs = sel.css(".content>img::attr(src)").extract()
    title = sel.css('h1::text').get()
    title = re.sub(r'[\\/:*?"<>| ]', '', title)
    for src in imgs:
        await imgTitleSrc_queue.put((title, src))
        logging.info(f"将{title}--{src}放入imgTitleSrc_queue队列")
    # 设置事件
    event1.set()


async def get_image_content():
    while True:
        try:
            title, src = imgTitleSrc_queue.get_nowait()
            content = await get_data_byteStream_api(src)
            await imgTitleSrcContent_queue.put((title, src, content))
            logging.info(f"将图片地址为{src}的图片放入imgTitleSrcContent_queue队列")
            # 当前任务完成
            imgTitleSrc_queue.task_done()
        except asyncio.QueueEmpty as e:
            await asyncio.sleep(1)
            if event1.is_set():
                break
            continue
    event2.set()  # 设置事件


async def save_img():
    while True:
        try:
            title, src, content = imgTitleSrcContent_queue.get_nowait()
            # 如果太小，即网站屏蔽，重新下载
            if sys.getsizeof(content) < 50 * 1024:
                return await imgTitleSrc_queue.put((title, src))
            filename = src.split("/")[-1]
            file_prefix, file_suffix = title + filename.split('.')[0][-4:], filename.split('.')[1]
            filename = file_prefix + '.' + file_suffix
            filename_path = os.path.join(image_dir, filename)
            # 保存图片
            async with aiofiles.open(filename_path, 'wb') as f:
                await f.write(content)
                logging.info(f"{filename_path} 保存完毕")
            imgTitleSrcContent_queue.task_done()
        except asyncio.QueueEmpty as e:
            await asyncio.sleep(1)
            if event2.is_set():
                break
            continue


async def main():
    global session
    # timeout = aiohttp.ClientTimeout(3)
    session = aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False))

    make_album()

    html = requests.get(group_url, headers={"user-agent": random.choice(user_agent)}).content.decode('utf8')

    imgSrc_task = asyncio.ensure_future(get_img_src(html))
    content_task = [asyncio.ensure_future(get_image_content()) for _ in range(5)]
    save_task = [asyncio.ensure_future(save_img()) for _ in range(5)]
    await asyncio.gather(imgSrc_task, *content_task, *save_task)
    await session.close()


if __name__ == '__main__':
    asyncio.run(main())
