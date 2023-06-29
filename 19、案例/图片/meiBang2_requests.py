import requests
import parsel
import re
import os
from urllib.request import urlretrieve

dir = os.path.dirname(__file__)
os.chdir(dir)
image_dir = os.path.join(dir, 'image', "陆宣萱2")


def make_album():
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)



headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
}

def save_img(group_url):
    r = requests.get(group_url, headers=headers)
    sel = parsel.Selector(r.text)
    title = '陆萱萱&amp'
    image_urls = sel.css(".content>img::attr(src)").extract()
    for url in image_urls:
        filename = title + url.split("/")[-1]
        file_path = os.path.join(image_dir, filename)
        urlretrieve(url, file_path)


if __name__ == '__main__':
    make_album()
    for page in range(1, 15):
        if page == 1:
            group_url = "http://www.meibang88.com/zhongguo/3307.html"
        else:
            group_url = f"http://www.meibang88.com/zhongguo/3307_{page}.html"
        save_img(group_url)