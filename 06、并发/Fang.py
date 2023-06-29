import requests
from lxml import etree
import re
from concurrent.futures import ThreadPoolExecutor

url = "https://www.fang.com/SoufunFamily.htm"

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
}

# 请求url，得到html代码
def get_html(url):
    response = requests.get(url, headers=headers)
    return response.content.decode("gbk")


def parse_list_detail(html):
    tree = etree.HTML(html)
    # 出现style="display:none;"的li标签，我们用try忽略
    lis = tree.xpath('//div[@id="newhouse_loupai_list"]/ul/li')
    try:
        for li in lis:
            name = li.xpath('.//div[@class="nlcd_name"]/a/text')[0].strip()
            house_type = '.'.join(li.xpath('.//div[@class="house_type clearfix"]//text()'))
            house_type = re.sub(r'\s+', '', house_type)
            address = li.xpath('.//div[@class="address"]/a/@title')[0]
            # 爬取房子的事后提示已售罄，没有tel（电话）？？

    except Exception as e:
        print(e)



def get_info(province, city, link):
    new_house_html = get_html(link)
    new_house__tree = etree.HTML(new_house_html)
    new_house_url = new_house__tree.xpath('//div[@track-id="newhouse"]/div[@class="s4Box"]/a/@href')[0]

    # 得到该城市下新房的主页
    city_newHouse_html = get_html(new_house_url)



# with ThreadPoolExecutor() as pool:
# 获取全国所有城市的主页链接
html = get_html(url)
tree = etree.HTML(html)
# 获取每行所在的tr标签，最后一行是国外的要去掉
trs = tree.xpath('//div[@id="c02"]//table/tr')[:-1]
# print([tr.xpath(".//text()") for tr in trs])

# 匹配时注意情况
# (1) 可能有tr为空行
# 记录上一次的省份值
last_province = ''
for tr in trs:
    # 去掉空行，空行的最后一个td标签里面什么都没有
    if tr.xpath('./td[last()]/a'):
        # 解析数据，得到三元组(省份，城市，链接)
        province = tr.xpath('./td[2]//text()')
        province = ''.join([i.strip() for i in province])
        if province:
            last_province = province
        else:
            province = last_province

        city = tr.xpath('./td[last()]/a/text()')
        link = tr.xpath('./td[last()]/a/@href')
        for i in range(len(city)):
            get_info(province, city[i], link[i])
                # pool.submit(get_info, province, city[i], link[i])