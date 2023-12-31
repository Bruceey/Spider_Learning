#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/11/22 17:31
# @Author  : huni
# @File    : 票房排行榜.py
# @Software: PyCharm

import requests
from fontTools.ttLib import TTFont
from lxml import etree
import re
import base64
import sqlite3


class MYSpider(object):
    """爬取猫眼总票房页面"""

    def __init__(self):
        # 请求url
        self.url = 'https://piaofang.maoyan.com/rankings/year'
        # 请求头
        self.headers = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko)  Version/11.0 Mobile/15A372 Safari/604.1",
        }
        # 建立字体文件对象
        base_font = TTFont("../maoyan_pf.woff")
        # 获取name和形状之间的关系
        base_glyph = base_font["glyf"]

        # 组装出基础映射字典
        self.base_num_glyph_map = {
            0: base_glyph["uniEAC9"],
            1: base_glyph["uniF477"],
            2: base_glyph["uniF47A"],
            3: base_glyph["uniEE5D"],
            4: base_glyph["uniEAB3"],
            5: base_glyph["uniE0B8"],
            6: base_glyph["uniE260"],
            7: base_glyph["uniF1A1"],
            8: base_glyph["uniE6F0"],
            9: base_glyph["uniEFF9"],
        }
        self.new_num_glyph_map = {}
        self.code_list = []


    def decryption_font(self, encryption_font):
        """字体解密保存"""
        # 使用bs64进行解码
        b = base64.b64decode(encryption_font)

        # 打开文件保存字体文件
        with open('maoyan_pf_new.woff', 'wb') as f:
            f.write(b)


    def font_map(self):
        """对字体生成新的映射"""
        # 生成当前字体文件的对象
        font = TTFont('maoyan_pf_new.woff')
        font.saveXML('maoyan_pf_new.xml')  # 将ttf文件生成xml文件并保存到本地
        # 获取当前字体的code和name映射
        code_name_cmap2 = font.getBestCmap()
        # 获取当前字体的字形
        name_glyph_map = font['glyf']

        # 遍历当前字体的code和name
        for code, name in code_name_cmap2.items():
            # 判断是否是无用的数据
            if name == "x":
                continue

            # 通过name取出当前字体的所有字形坐标
            current_glyph = name_glyph_map[name]
            num_diff = dict()

            # 遍历基础字形字典，取出对应的映射数字和坐标
            for num, glyph in self.base_num_glyph_map.items():
                # 定义一个变量用来记录当前所有坐标的最小差值
                diff = 0

                # 遍历当前字形字典，取出所有坐标
                for coor1 in current_glyph.coordinates:
                    # 定义一个列表用来保存当前最小差值的所有差值
                    coor_diff_list = list()
                    for coor2 in glyph.coordinates:
                        coor_diff_list.append(abs(coor1[0] - coor2[0]) + abs(coor1[1] - coor2[1]))
                    diff += min(coor_diff_list)
                # 组成当前字体的映射字典
                num_diff[num] = diff

            # 取出对应的映射
            num = min(num_diff, key=num_diff.get)
            # code = str(hex(code)).replace("0", "&#", 1) + ";"
            # 将默认映射替换成想要的样式
            code = str(hex(code)).replace("0x", r"\u", 1)
            self.code_list.append(code)
            # print(code, num)
            # 将新字体的映射组成字典保存
            self.new_num_glyph_map[code] = num


    def run(self):
        """开始爬取"""
        # 发送请求
        response = requests.get(url=self.url, headers=self.headers)
        # print(response.text)
        # 转换成lxml对象进行xpath提取
        html = etree.HTML(response.text)

        # 获取字体加密
        # 提取style标签里面的内容
        encryption_font = html.xpath("//*[@id='js-nuwa']/text()")

        # 使用正则提取想要的加密字体
        ex = re.compile(r"base64,(.*?)\)",re.S)
        encryption_font = re.findall(ex, ''.join(encryption_font))[0]

        # 调用方法对字体进行解密
        self.decryption_font(encryption_font)

        # 对新字体进行映射
        self.font_map()

        # 获取详情
        ul_list = html.xpath('//*[@id="ranks-list"]/ul')
        # print(ul_list)
        # 调用方法获取票房信息
        all_info_list = self.get_info(ul_list)
        #定义保存数据库路径
        dbpath = '猫眼总票房.db'
        #初始化数据库方法
        self.init_db(dbpath)
        #保存到数据库
        self.saveDatadb(dbpath,all_info_list)


    def get_info(self, ul_list):
        """获取票房信息"""
        all_info_list = []
        for tr in ul_list:
            i = []
            top = tr.xpath('./li[1]/text()')[0]             #排名
            cname = tr.xpath('./li[2]/p[1]/text()')[0]      #电影名
            ptime = tr.xpath('./li[2]/p[2]/text()')[0]      #上映日期
            almony = tr.xpath('./li[3]/i/text()')[0]        #总票房
            price = tr.xpath('./li[4]/i/text()')[0]         #平均票价
            people = tr.xpath('./li[5]/i/text()')[0]        #场均人数

            i.append(top)
            i.append(cname)
            i.append(ptime)
            i.append(almony)
            i.append(price)
            i.append(people)
            j = str(i)              #这里把列表转成字符串，方便下面的元素替换
            print(i)


            for word in self.code_list:
                if word in j:
                    j = j.replace(word,str(self.new_num_glyph_map[word]))
            m = list(eval(j))       #这里使用eval（）方法再把字符串转成原来的列表形式，方便储存到数据库
            all_info_list.append(m)
        # print(all_info_list)
        return all_info_list


    # 初始化数据库，创建表
    def init_db(self,dbpath):
        sql1 = '''
                drop table if exists 内地票房排行榜
            '''  # 删除原来的数据表
        sql2 = '''
            create table if not exists 内地票房排行榜
            (
            排行 numeric ,
            电影名 varchar ,
            上映日期 varchar,
            累计票房_万 numeric ,
            平均票价 numeric ,
            场均人数 numeric 
            )

        '''  # 创建数据表
        conn = sqlite3.connect(dbpath)
        cursor = conn.cursor()
        cursor.execute(sql1)
        cursor.execute(sql2)
        conn.commit()
        conn.close()

    # 数据保存到数据库
    def saveDatadb(self,dbpath, all_info_list):
        self.init_db(dbpath)
        conn = sqlite3.connect(dbpath)
        cur = conn.cursor()

        for data in all_info_list:
            for index in range(len(data)):
                data[index] = '"' + str(data[index]) + '"'  # replace into
            sql = '''
                    insert into 内地票房排行榜(
                    排行,电影名,上映日期,累计票房_万,平均票价,场均人数)
                    values(%s)''' % ",".join(data)
            # print(sql)
            cur.execute(sql)
            conn.commit()
        cur.close()
        conn.close()


if __name__ == '__main__':
    my = MYSpider()
    my.run()
    print('爬取成功！')




