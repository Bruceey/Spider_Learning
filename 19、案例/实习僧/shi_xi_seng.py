import requests
import parsel
from urllib.parse import urljoin
from urllib.request import urlretrieve
from io import BytesIO
from fontTools.ttLib import TTFont
import pymysql


db = pymysql.Connect(user='root', password='mysql', database='spider')
cursor = db.cursor()

base_url = 'https://www.shixiseng.com/'
index_url = 'https://www.shixiseng.com/interns?page={page}&type=intern&keyword=Java&area=&months=&days=&degree=&official=&enterprise=&salary=-0&publishTime=&sortType=&city=%E5%85%A8%E5%9B%BD&internExtend='

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

def get_hex_charMap(bytesIo: BytesIO):
    font = TTFont(bytesIo)
    cMap = font.getBestCmap()
    hex_charMap = {chr(key): chr(int(cMap[key][3:], 16)) for index, key in enumerate(cMap) if index > 0}
    return hex_charMap

def get_real_string(unicode_string, hex_charMap):
    if unicode_string is None:
        return ''
    final_string = ''
    for char in unicode_string:
        tmp = hex_charMap.get(char)
        if tmp:
            final_string += tmp
        else:
            final_string += char
    return final_string

def savedb(data: dict):
    print("data:", data)
    keys = ', '.join(data.keys())
    values = ', '.join(["%s"] * len(data))
    sql = "insert into %s (%s) values (%s)" % ("实习僧", keys, values)
    cursor.execute(sql, tuple(data.values()))
    db.commit()


def get_content(url):
    r = requests.get(url, headers=headers)
    assert r.status_code == 200
    return r.content

def get_html(url):
    content = get_content(url)
    return content.decode('utf8')

def run():
    page = 1
    while True:
        url = index_url.format(page=page)
        html = get_html(url)

        sel = parsel.Selector(html)
        # 获取字体的下载链接
        font_url = sel.re_first(r'@font-face.*?src: url\((.*?)\)')
        font_url = urljoin(base_url, font_url)
        # urlretrieve(font_url, "实习僧字体.woff")
        content = get_content(font_url)
        hex_charMap = get_hex_charMap(BytesIO(content))
        # pprint(hex_charMap)

        items = sel.css('.intern-wrap.intern-item')
        for item in items:
            data = {}
            data['title'] = item.css('.intern-detail__job>p>a::text').get()
            job_chunk = item.css('.intern-detail__job>p>span::text').extract()
            data['salary_tip'] = ', '.join(job_chunk).replace('|, ', '')
            data['company'] = item.css('.intern-detail__company>p>a::attr(title)').get()
            company_chunk =item.css('.intern-detail__company>p>span::text').extract()
            data['company_tip'] = ''.join(company_chunk)
            job_benefits = item.css('.advantage-wrap>.f-l>span::text').extract()
            data['job_benefits'] = ', '.join(job_benefits)
            data['company_desc'] = item.css('.advantage-wrap>.f-r>span::text').get()
            # 替换真实字符串
            data = {key: get_real_string(value, hex_charMap) for key, value in data.items()}
            # 存入数据库
            savedb(data)


        if sel.css('.btn-next::attr(disabled)').get() is None:
            page += 1
        else:
            break

def main():
    try:
        run()
    finally:
        cursor.close()
        db.close()

if __name__ == '__main__':
    main()