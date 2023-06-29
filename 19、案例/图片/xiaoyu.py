import requests
import parsel
import os
from concurrent.futures import ThreadPoolExecutor
import threading
import random
import math
import sys

user_agent = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2919.83 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2866.71 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux i686 on x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2820.59 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2762.73 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:77.0) Gecko/20100101 Firefox/77.0',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:39.0) Gecko/20100101 Firefox/75.0'
]

base_url = 'https://www.nvshens.org/g/34572/'
prefix = "白茹雪Abby"


lock = threading.Lock()
page_url = base_url + '{page}.html'

headers = {
    'User-Agent': None,
    'referer': 'https://www.nvshens.org/'
}
filename_set = set()
dir = os.path.dirname(__file__)
os.chdir(dir)
image_dir = os.path.join(dir, 'image', prefix)


def make_album():
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)


def get_proxy():
    return requests.get("http://127.0.0.1:5010/get/").json()


def delete_proxy(proxy):
    requests.get("http://127.0.0.1:5010/delete/?proxy={}".format(proxy))


def get_real_photoUrl(gid: int, src: str):
    if gid >= 21122:
        return src.replace(f"{gid}/s", str(gid))
    else:
        return src


def get_data_byteStream(url):
    headers['User-Agent'] = random.choice(user_agent)
    proxy = get_proxy().get("proxy")
    proxy_dict = {
        "http": f"http://{proxy}",
    }
    r = requests.get(url, headers=headers, proxies=proxy_dict)
    content = r.content
    return content


def get_html(url):
    r = get_data_byteStream(url)
    return r.decode('utf8')


def save_img(gid, url):
    print(f"正在保存{url}")
    content = get_data_byteStream(url)
    # 如果太小，即网站屏蔽，重新下载
    if sys.getsizeof(content) < 50 * 1024:
        return save_img(gid, url)
    filename = prefix + f"{gid}_" + url.split("/")[-1]

    file_prefix, file_suffix = filename.split('.')[0], filename.split('.')[1]
    with lock:
        count = 1
        while True:
            if filename in filename_set:
                file_prefix += str(count)
                filename = file_prefix + '.' + file_suffix
            else:
                filename_set.add(filename)
                break
        filename_path = os.path.join(image_dir, filename)

        with open(filename_path, 'wb') as f:
            f.write(content)
        print(f"{filename_path}下载完毕")


def run(url):
    html = get_html(url)
    selector = parsel.Selector(html)
    gid = selector.css("#gid::attr(value)").get()
    imgs = selector.css("#hgallery>img::attr(src)").extract()
    # 转换为超高清图
    imgs = [get_real_photoUrl(int(gid), img) for img in imgs]
    for src in imgs:
        save_img(gid, src)


def main():
    make_album()
    # 获取一共多少页
    html = get_html(base_url)
    sel = parsel.Selector(html)
    pages = sel.css("#dinfo>span::text").re_first(r'\d+')
    pages = int(pages)

    with ThreadPoolExecutor() as pool:
        for page in range(1, math.ceil(pages / 3) + 1):
            url = page_url.format(page=page)
            pool.submit(run, url)
            # run(url)


if __name__ == '__main__':
    main()
