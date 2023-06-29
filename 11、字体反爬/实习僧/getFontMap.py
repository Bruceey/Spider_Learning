from fontTools.ttLib import TTFont
import re
from pprint import pprint
import pickle


# 之前没找到规律一个个手动映射
# real_char = (
# '0', 'b', '件', 'B', 'D', 'C', '联', 'v', '一', 'I', 'o', 'g', '软', '会', '师', '二', 'y', '4', '月', '网', 'z', '前', 'Z',
# '四', '作', '告', 'H', 's', 'x', 'h', '程', '人', 'M', 'r', '广', '财', 'U', '行', '场', 't', 'W', '三', 'E', '9', 'K', '聘',
# 'm', '政', '招', '个', '生', 'L', 'O', '计', '互', 'a', 'F', 'k', 'c', '8', '设', 'i', 'J', '工', 'l', '5', '市', '2', 'Q', '3',
# 'u', 'R', '周', 'S', 'X', '五', '端', 'G', 'V', 'q', 'j', 'A', '年', '6', '银', 'f', 'Y', 'p', 'd', 'n', 'N', 'P', 'T', 'w',
# '天', 'e', '7', '1'
# )


def get_dict():
    '''
    输入：无
    输出：字体文件对应的字体字典（包含字体编码和对应字体）以及字体编码
    '''
    font = TTFont("实习僧.woff")
    # font.saveXML("实习僧.xml")
    cMap = font.getBestCmap()
    del cMap[120]
    # print(cMap)
    uni_charMap = { '0x' + cMap[key][3:].lower(): chr(int(cMap[key][3:], 16)) for key in cMap}
    return uni_charMap


uni_charMap = get_dict()
print(uni_charMap)


