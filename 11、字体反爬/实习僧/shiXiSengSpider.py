import requests
import parsel
from urllib.request import urlretrieve
from fontTools.ttLib import TTFont
import os
import pandas as pd

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}
base_dir = os.path.dirname(__file__)

df = pd.read_excel(os.path.join(base_dir, "职位信息.xlsx"))


def get_uni_charMap(font_url):
    '''
    输入：font地址
    输出：字体文件对应的字体字典（包含字体编码和对应字体）以及字体编码
    '''
    font_path = os.path.join(os.path.dirname(__file__), '实习僧2.woff')
    urlretrieve(font_url, font_path)

    font = TTFont(font_path)
    # 注意去掉第一个
    cMap: dict = font.getBestCmap()
    # print(cMap)
    uni_charMap = {hex(key): chr(int(cMap[key][3:], 16)) for index, key in enumerate(cMap.keys()) if index > 0}
    return uni_charMap


def get_real_string(string: str, uni_charMap: dict) -> str:
    final_str = ''
    for char in string:
        char_hex = hex(ord(char))
        if char_hex in uni_charMap:
            final_str += uni_charMap[char_hex]
        else:
            final_str += char
    return final_str


def run(url):
    global df
    print(f"正在解析{url}")

    # 存储该职位所有信息
    info = {}

    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        sel = parsel.Selector(r.text)
        # 获取font地址
        font_url = sel.re_first(r'src: url\("(.+?)"\)')
        # 调用get_uni_charMap获取unicode和真正字符的映射
        uni_charMap = get_uni_charMap(font_url)

        # 新工作的名字
        new_job_name = sel.css('.new_job_name::attr("title")').get()
        info['职位'] = new_job_name
        # 公司名字
        company = sel.css('.com-name::text').get().strip()
        company = get_real_string(company, uni_charMap)
        info['公司'] = company
        # 刷新时间
        job_date = sel.css('.job_date *::text').extract()
        job_date = ','.join(i.strip() for i in job_date if i.strip() != '')
        job_date = get_real_string(job_date, uni_charMap)
        info['刷新时间'] = job_date
        # 工作福利
        job_good = sel.css('.job_good_list *::text').extract()
        job_good = ','.join(i.strip() for i in job_good if i.strip() != '')
        job_good = get_real_string(job_good, uni_charMap)
        info['工作福利'] = job_good
        # 薪资
        job_money = sel.css('span.job_money::text').get().strip()
        job_money = get_real_string(job_money, uni_charMap)
        info['薪资'] = job_money
        # 工作地点
        job_position = sel.css('span.job_position::text').get().strip()
        job_position = get_real_string(job_position, uni_charMap)
        info['工作地点'] = job_position
        # 学历要求
        job_academic = sel.css('span.job_academic::text').get().strip()
        job_academic = get_real_string(job_academic, uni_charMap)
        info['学历要求'] = job_academic
        # 每周工作时间
        job_week = sel.css('span.job_week::text').get().strip()
        job_week = get_real_string(job_week, uni_charMap)
        info['每周工作时间'] = job_week
        # 总时间
        job_time_list = sel.css('span.job_time::text').extract()
        job_time = ','.join(i.strip() for i in job_time_list if i.strip() != '')
        job_time = get_real_string(job_time, uni_charMap)
        info['总时间'] = job_time
        # 工作要求
        job_detail = sel.css('.job_detail *::text').extract()
        job_detail = ','.join(i.strip() for i in job_detail if i.strip() != '')
        job_detail = get_real_string(job_detail, uni_charMap)
        info['工作要求'] = job_detail
        # 投递要求
        con_job = sel.css(
            'body > div.wrap > div.job-box > div.job-content > div.content_left > div:nth-child(7) *::text').extract()
        con_job = ','.join(i.strip() for i in con_job if i.strip() != '')
        con_job = get_real_string(con_job, uni_charMap)
        info['投递要求'] = con_job
        # 具体工作地点
        job_city = sel.css('.job_city>span::text').get()
        job_city = get_real_string(job_city, uni_charMap)
        info['具体工作地点'] = job_city

        # 公司概述
        com_desc = sel.css('.com-desc::text').get().strip()
        com_desc = get_real_string(com_desc, uni_charMap)
        info['公司概述'] = com_desc
        # 公司标签
        com_tags = sel.css('.com-tags *::text').extract()
        com_tags = ','.join(i.strip() for i in com_tags if i.strip() != '')
        com_tags = get_real_string(com_tags, uni_charMap)
        info['公司标签'] = com_tags
        # 公司信息
        com_detail = sel.css('.com-detail *::text').extract()
        com_detail = ','.join(i.strip() for i in com_detail if i.strip() != '')
        com_detail = get_real_string(com_detail, uni_charMap)
        info['公司信息'] = com_detail
        # 保存到excel中
        df_new = pd.DataFrame([info])
        if len(df.index) == 0:
            df = df_new
        else:
            df = pd.concat([df, df_new], ignore_index=True)

    else:
        print(r.status_code)


def get_all_pages():
    # 获取总页数
    start_url = 'https://www.shixiseng.com/interns?keyword=Java&city=%E5%85%A8%E5%9B%BD&from=menu'
    r = requests.get(start_url, headers=headers)
    sel = parsel.Selector(r.text)
    pages = sel.xpath('//ul[@class="el-pager"]/li[last()]/text()').get()
    return int(pages)


def main():
    pages = get_all_pages()

    base_url_format = 'https://www.shixiseng.com/interns?page={}&type=intern&keyword=Python&area=&months=' \
                      '&days=&degree=&official=&enterprise=&salary=-0&publishTime=&sortType=&city=%E5%85%A8%E5%9B%BD&internExtend='
    for page in range(1, pages + 1):
        r = requests.get(base_url_format.format(page), headers=headers)
        if r.status_code == 200:
            sel = parsel.Selector(r.text)
            # 获取职位详情页url
            urls = sel.css('div.intern-detail__job a::attr("href")').extract()
            for url in urls:
                run(url)
        else:
            print(r.status_code)
            print(f'爬取第{page}页出现问题')
            print(r.text)
    df.to_excel('职位信息2.xlsx', index=False)


if __name__ == '__main__':
    main()
