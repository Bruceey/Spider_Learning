import requests
import re
import csv
import redis
import atexit


@atexit.register
def clean():
    r.set('symbol', symbol_str)
    r.close()

def parse(html):
    data_list = []
    # 获取文章id
    ids = re.findall(r'data-note-id="(\d+?)"', start_html, re.S)
    data_tuples = re.findall(r'<a class="title".*?href="(?P<href>.*?)">(?P<title>.*?)</a>.*?<p class="abstract">(?P<abstract>.*?)</p>.*?class="nickname".*?>(?P<author>.*?)</a>', html, re.S)
    for data_tuple in data_tuples:
        data_tuple = list(data_tuple)
        data_tuple[0] = "https://www.jianshu.com/" + data_tuple[0]
        data_tuple[2] = data_tuple[2].strip()
        data_list.append(data_tuple)
    return ids, data_list


if __name__ == '__main__':
    pool = redis.ConnectionPool(host='localhost', port=6379, decode_responses=True)
    r = redis.Redis(connection_pool=pool)
    # 去重标示
    symbol_str = r.get("symbol") if r.get("symbol") else ''


    start_url = 'https://www.jianshu.com/'
    headers = {
        'Origin': 'https://www.jianshu.com',
        'Referer': 'https://www.jianshu.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
    }

    with open("简书文章.csv", "a", encoding="utf-8") as f:
        writer = csv.writer(f)
        # writer.writerow(['详情链接', '标题', '摘要', '作者'])

        start_html = requests.get(start_url, headers=headers).text
        start_ids, start_data_list = parse(start_html)
        for start_data in start_data_list:
            writer.writerow(start_data)
            symbol_str += (start_data[0] + ",")

        # 获取token值
        csrf_token = re.search(r'name="csrf-token".*?="(.+?)"', start_html, re.S).group(1)


        # 开始post请求
        headers["X-CSRF-Token"] = csrf_token
        headers["X-PJAX"] = "true"
        headers["X-Requested-With"] = "XMLHttpRequest"

        params = {}
        params["seen_snote_ids"] = ','.join(start_ids)
        for _ in range(100):
            html = requests.post('https://www.jianshu.com/trending_notes', data=params, headers=headers).text
            ids, data_list = parse(html)
            for data in data_list:
                if data[0] not in symbol_str:
                    writer.writerow(data)
                    symbol_str += (data[0] + ",")

            params["seen_snote_ids"] += ("," + ','.join(ids))

