import requests
import parsel
import csv
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from pprint import pprint
import re
from urllib.request import urlretrieve
from fontTools.ttLib import TTFont
import hashlib
import math

# 是 9fc50aa7.woff 的基准
base_font = {
    'uniEA1A': '0',  #
    'uniF808': '1',  #
    'uniF479': '2',  #
    'uniE298': '3',  #
    'uniF27B': '4',  #
    'uniE7EC': '5',  #
    'uniE610': '6',  #
    'uniE334': '7',  #
    'uniE561': '8',  #
    'uniE5DD': '9',  #
}

# 是 f0d252d2.woff 测试样本
base_font2 = {
    'uniEB58': '0',  ##
    'uniEBD9': '1',  ##
    'uniF44C': '2',  ##
    'uniF455': '3',  ##
    'uniE87E': '4',  ##
    'uniE279': '5',  ##
    'uniF77D': '6',  ##
    'uniE75E': '7',  ##
    'uniE076': '8',  #
    'uniF458': '9',  ##
}

font1 = TTFont('9fc50aa7.woff')
code1_list = font1.getGlyphOrder()[2:]
font2 = TTFont('f0d252d2.woff')
code2_list = font2.getGlyphOrder()[2:]


# 标准化
def uniformCoordinate(centerCoordinate: tuple, glyphCoordinates: list) -> list:
    for i in range(len(glyphCoordinates)):
        coordinate = glyphCoordinates[i]
        glyphCoordinates[i] = (coordinate[0] - centerCoordinate[0], coordinate[1] - centerCoordinate[1])
    return glyphCoordinates


def calc_coordinate(cur_SQUARE, base_SQUARE, glyphCoordinates) :
    """
    计算缩放后每个点的实际坐标
    """
    # 计算测试字形矩形的放大长度是基准字形的几倍
    ratio = math.sqrt(cur_SQUARE / base_SQUARE)
    for index in range(len(glyphCoordinates)):
        coordinate = glyphCoordinates[index]
        # 求出测试字体的字形的点缩放后坐标
        line_len = math.sqrt(coordinate[0]**2 + coordinate[1]**2)
        sinA = coordinate[1] / line_len
        cosA = coordinate[0] /line_len
        curr_len = line_len * ratio
        glyphCoordinates[index] = (curr_len * cosA, curr_len * sinA)



def calc_fontDistance(code1_coordinates, code2_coordinates):
    # 样本点不对称，如何处理？？？？？？
    # 总的距离，即字形与字形的距离
    dis = 0
    for x2, y2 in code2_coordinates:
        # 当前字形的一个坐标与基准字形其他所有坐标的差值
        coordinate_diff = []
        for x1, y1 in code1_coordinates:
            point_dis = math.sqrt(math.pow(x1 - x2, 2) + math.pow(y1 - y2, 2))
            # point_dis = math.fabs(x1 - x2) + math.fabs(y1 - y2)
            coordinate_diff.append(point_dis)
        dis += min(coordinate_diff)
    return dis



for code2 in code2_list:  # code2是字形代码
    # 当前字形的所有坐标
    obj2 = font2['glyf'][code2]
    # 当前字体所在的矩形面积
    cur_SQUARE = (obj2.xMax - obj2.xMin) * (obj2.yMax - obj2.yMin)
    # 将所有坐标标准化
    centerCoordinate2 = (((obj2.xMax + obj2.xMin)) / 2, (obj2.yMax + obj2.yMin) / 2)
    code2_coordinates = uniformCoordinate(centerCoordinate2, list(obj2.coordinates))
    # 当前字形与基准字体其他字形的距离
    dis_list = []
    for code1 in code1_list:
        obj1 = font1['glyf'][code1]
        # 基准字体所在矩形面积
        base_SQUARE = (obj1.xMax - obj1.xMin) * (obj1.yMax - obj1.yMin)
        # 将所有坐标标准化
        centerCoordinate1 = (((obj1.xMax + obj1.xMin)) / 2, (obj1.yMax + obj1.yMin) / 2)
        code1_coordinates = uniformCoordinate(centerCoordinate1, list(obj1.coordinates))

        # 根据code1_coordinates，计算缩放后每个点的实际坐标，直接在原对象code2_coordinates上进行处理
        calc_coordinate(cur_SQUARE, base_SQUARE, code2_coordinates)
        # 计算字形之间的距离，卡在这里？？？？？？？？？？？？？
        dis = calc_fontDistance(code1_coordinates, code2_coordinates)

        dis_list.append((dis, code1))
    # 得到dis_list，准到距离最小的那个,，找到对应的基准字体的code
    _, calc_code = min(dis_list, key=lambda x: x[0])
    calc_num = base_font[calc_code]
    print(f'计算字形code为{calc_code}，值为{calc_num}')
    print(f'原始字形code为{code2}，值为{base_font2[code2]}')
    print('=' * 50)
