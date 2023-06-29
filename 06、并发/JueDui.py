# 抓取绝对领域cosplay图片（多线程版本）

import requests
from bs4 import BeautifulSoup
import os
from concurrent.futures import ThreadPoolExecutor
import time
import atexit
import re

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
    size = 0    # 单位是字节
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

    print("\033[31m="*100)
    print("一共下载了{}个文件, 大小为{:.2f}M".format(len(files), size))
    print("下载速度为{:.2f} kb/s".format(speed))
    print("耗时{}小时{}分钟{}秒".format(hour, minute, seconds))
    print("="*100)


headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}


def get_html(url):
    response = requests.get(url, headers=headers)
    return response.content.decode("utf-8")


# 下载图片
def download(name, src, page):
    ##################
    print(f"\033[32m正在下载第{page}页，图片链接地址为 {src} 的图片")
    print("\033[0m", end='')
    ##################
    # 二进制文件
    content = requests.get(src, headers=headers).content


    # 拼写完整的图片路径，其中这里的"."表示当前这个文件所在的目录
    file_path = "./image/" + name
    # 将二进制数据写入文件
    with open(file_path, 'wb') as f:
        f.write(content)


def parse_img_detail(group_soup, page, count):
    # 获取组图标题
    title = group_soup.find("h1").string.strip()
    title = re.sub(r'[\\/:*?"<>|]', '', title)
    # 获取图片的src
    ##########  注意此处的imgs可能为空，因为从第16页开始每组图片分多页（目前观察最多两页），
    ##########  且当前页的img标签在.entry-content>p>img下，

    imgs = group_soup.select('.entry-content>div>p>img')
    if not imgs:
        imgs = group_soup.select('.entry-content>p>img')
    ##################
    print(f"\033[36m当前第{page}页，组图名字为{title}，图片的src列表为*****{imgs}******")
    print("\33[0m", end='')
    ##################

    for img in imgs:
        # 如 http://img.jder.net/wp-content/uploads/2020/11/1604028134273262.jpg?imageView2/1/w/1300/h/1948/q/75#
        src = img["src"]
        # 1_阳师师 不知火 Cn：物部弥生_1.jpg
        name = f"{page}_{title}_{count[0]}.jpg"
        download(name, src, page)
        count[0] += 1


def run(url, page):
    """
    主任务函数，
    获取组图url，并调用parse_img_detail函数获取图片的src链接
    :param url: 每一页的url
    :param page: 每一页
    :return:
    """
    # 获取缩略图的链接（组图链接）
    print(f"正在请求第{page}页的链接")
    page_html = get_html(url)
    page_soup = BeautifulSoup(page_html, "lxml")
    aTags = page_soup.select('.post-info a')
    for a in aTags:
        group_url = a["href"]
        print(f"正在请求第{page}页，组图 {group_url}")
        # 请求组图链接
        group_html = get_html(group_url)
        group_soup = BeautifulSoup(group_html, "lxml")
        # 给每个组图下的照片编号
        count = [1]
        parse_img_detail(group_soup, page, count)

        ########## 组图链接group_url可能有多页（目前看最多两页）
        ##########  如有多页在.post-links>a标签下，链接为a的href属性
        aTags = group_soup.select('.post-links>a')
        if aTags:
            for a in aTags:
                # 请求组图链接得到每张图的src
                group_url = a["href"]
                print(f"正在请求第{page}页，组图 {group_url}")
                group_html = get_html(group_url)
                group_soup = BeautifulSoup(group_html, "lxml")
                parse_img_detail(group_soup, page, count)



if __name__ == '__main__':
    start = time.time()

    # 在本地创建image文件夹
    if not os.path.exists("image"):
        os.mkdir("image")

    try:
        # # 1、单线程
        # for page in range(1, 187):
        #     url = f"https://www.jder.net/cosplay/page/{page}"
        #     run(url, page)

        # 2、多线程
        with ThreadPoolExecutor() as pool:
            # 将任务加到线程池任务队列中
            for page in range(1, 187):
                url = f"https://www.jder.net/cosplay/page/{page}"
                pool.submit(run, url, page)

    except Exception as e:
        print(f'\033[31m{e}')
        print("\33[0m")