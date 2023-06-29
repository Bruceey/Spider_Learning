import requests
import parsel
import csv

headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    'referer': 'https://maoyan.com/',
}
cookies = """lt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; lt.sig=y8Z35vm0s33pZar20SZcdcJx7mE; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; uid.sig=hlqKwItixnwRJMmu6X-sP8X3qa8; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"""
cookies = {i.split('=')[0]: i.split('=')[1] for i in cookies.split("; ") if len(i.split('=')) > 1}

base_font = {
    'uniF489': '0',
    'uniE343': '1',
    'uniF19B': '2',
    'uniF848': '3',
    'uniE5E2': '4',
    'uniE8CD': '5',
    'uniF4EF': '6',
    'uniF88A': '7',
    'uniE137': '8',
    'uniE7A1': '9',
    'uni2E': '.'
}

def getRealNumber(char_raw):
    char_hex_list = [ 'uni' + '%x'.upper() % ord(i) for i in char_raw]
    result = ''
    for char in char_hex_list:
        result += base_font[char]
    return result

def get(movie_detail_url):
    r = requests.get(movie_detail_url, headers=headers, cookies=cookies)
    if r.status_code == 200:
        sel = parsel.Selector(r.text)
        # 电影名字
        name = sel.css('h1::text').get()
        # 获取评分
        score_raw = sel.css('.index-left.info-num>span::text').get()
        score = '暂无'
        if score_raw:
            score = getRealNumber(score_raw)
        # 评分人数
        personNum_raw = sel.css('.score-num>span::text').get()
        personNum = '暂无'
        if personNum_raw:
            personNum = getRealNumber(personNum_raw[:-1]) + personNum_raw[-1]
        # 票房
        ticket_raw = sel.css('.movie-index-content.box>span.stonefont::text').get()
        unit = sel.css('.movie-index-content.box>span.unit::text').get()
        ticket = getRealNumber(ticket_raw) + unit
        writer.writerow([name, score, personNum, ticket])
    else:
        print(r.status_code)


# 保存数据到本地
with open("电影数据.csv", "w", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(['电影名', '评分', '评分人数', '票房'])

    r = requests.get('https://maoyan.com/films?showType=1', headers=headers)
    if r.status_code == 200:
        print(r.status_code)
        print(r.text)
        sel = parsel.Selector(r.text)
        movie_detail_urls = sel.css('.movie-item>a::attr(href)').extract()
        print(movie_detail_urls)
        for url in movie_detail_urls:
            get('https://maoyan.com' + url)
    else:
        print(r.status_code)
