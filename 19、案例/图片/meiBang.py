import re
import requests
from concurrent.futures import ThreadPoolExecutor
import threading
import os
import random
import sys
import parsel

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

# 停用符号
stop_words = re.compile(r'\\/:\*\?"<>|')

lock = threading.Lock()

group_url = "http://www.meibang88.com/zhongguo/5868.html"

dir = os.path.dirname(__file__)
os.chdir(dir)
image_dir = os.path.join(dir, 'image', "陆宣萱")


def make_album():
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)


def get_proxy():
    return requests.get("http://127.0.0.1:5010/get/").json()


def delete_proxy(proxy):
    requests.get("http://127.0.0.1:5010/delete/?proxy={}".format(proxy))


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


def save_img(title, url):
    print(f"开始下载 {title}, url为{url}")
    content = get_data_byteStream(url)
    print(f"{title}--{url}下载完毕")
    # 如果太小，即网站屏蔽，重新下载
    if sys.getsizeof(content) < 50 * 1024:
        return save_img(title, url)
    filename = url.split("/")[-1]
    file_prefix, file_suffix = title + filename.split('.')[0][-4:], filename.split('.')[1]
    filename = file_prefix + '.' + file_suffix
    # with lock:
    filename_path = os.path.join(image_dir, filename)
    print(f"图片路径--{filename_path}")
    with open(filename_path, 'wb') as f:
        f.write(content)
    print(f"{filename_path} 保存完毕")

def main():
    make_album()

    html = get_html(group_url)
    sel = parsel.Selector(html)
    imgs = sel.css(".content>img::attr(src)").extract()
    title = sel.css('h1::text').get()
    title = re.sub(r'[\\/:*?"<>| ]', '', title)
    with ThreadPoolExecutor() as pool:
        for src in imgs:
            pool.submit(save_img, title, src)


if __name__ == '__main__':
    main()