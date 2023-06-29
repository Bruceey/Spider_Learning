import requests
from pprint import pprint
import time
import hashlib
import base64

# 每部电影索引url，有电影的概览信息
index_url = 'https://dynamic6.scrape.cuiqingcai.com/api/movie/?limit=100&offset=0&token=%s'
# 电影详情的url，id参数是id和一个字符串拼接后base64加密得到
detail_url = 'https://dynamic6.scrape.cuiqingcai.com/api/movie/{id}?token={token}'


def get_token(attr):
    curr_time = time.time()
    time_seconds = round(curr_time)
    string = attr + "," + str(time_seconds)
    encode_str = hashlib.sha1(string.encode("utf8")).hexdigest()
    encode_str2 = encode_str + ',' + str(time_seconds)
    return base64.b64encode(encode_str2.encode("utf8")).decode('utf8')


token = get_token('/api/movie')
url = index_url % token
r = requests.get(url, verify=False)
json = r.json()
data_list = json['results']

prefix = 'ef34#teuq0btua#(-57w1q5o5--j@98xygimlyfxs*-!i-0-mb'
for data in data_list:
    # 获取加密id
    id = prefix + str(data.get('id'))
    id_encode = base64.b64encode(id.encode('utf8')).decode('utf8')

    # 得到详情的token值
    detail_token = get_token("/api/movie/" + id_encode)
    detail_url = detail_url.format(id=id_encode, token=detail_token)
    detail_json = requests.get(detail_url, verify=False).json()
    pprint(detail_json)
    break