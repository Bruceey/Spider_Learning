import time
import requests
import execjs
import re

headers = {
    # 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15',
    'Accept-Encoding': ', '.join(('gzip', 'deflate')),
    'Accept': '*/*',
    'Connection': 'keep-alive',

}

start_url = "https://fanyi.baidu.com/#zh/en/"
base_url = 'https://fanyi.baidu.com/v2transapi?from={}&to={}'
session = requests.Session()
session.headers.update(headers)

with open('func_e.js') as f:
    js_code = f.read()


def get_sign(keyword, gtk):
    ctx = execjs.compile(js_code)
    return ctx.call("e", keyword, gtk)


def get_token_gtk(text=None):
    """
    在主页中获取token、gtk
    token必须刷新后才可获取，gtk可直接获取
    :param text:
    :return:
    """
    token = re.search(r"token: '(.*?)'", text).group(1)
    if not token:
        html = reload_homepage()
        get_token_gtk(html)
        return
    gtk = re.search(r"window.gtk = '(.*?)'", text).group(1)
    return token, gtk


def reload_homepage():
    return session.get(start_url).text


def get_transtion(params):
    """
    得到返回结果
    :param params:
    :return:
    """
    url = base_url.format(params['from'], params['to'])
    response = session.post(url, data=params)
    raw_dict = response.json()
    data_list = raw_dict['trans_result']['data']
    final_str = "\n".join([data['dst'] for data in data_list])
    return final_str


def detect_lang(keyword):
    sample = keyword
    sample_list = keyword.split('\n')
    # 如果列表长度大于3，取前三个样本
    if len(sample_list) > 3:
        sample = ''.join(sample_list[:3])
    letters = re.findall(r'[a-zA-Z]+', sample)
    letter_len = len(''.join(letters))
    zh_len = len(sample) - letter_len
    return ("zh", "en") if zh_len > letter_len else ("en", "zh")


def main():
    session.get(start_url)
    html = reload_homepage()
    token, gtk = get_token_gtk(html)
    while True:
        print("请输入您想要查询的词(输入完成后请按'q'键确认):")
        keyword = ''
        while True:
            #  去除空白字符
            temp = input().strip()
            # 检验是否为空，是的话结束本轮循环
            if len(temp) == 0:
                print("您输入的字符为空，请重新输入!")
                continue
            if (temp == 'q'):
                break
            keyword += (temp + "\n")

        sign = get_sign(keyword, gtk)

        # zh是中文，en是英语
        srcLang, dstLang = detect_lang(keyword)

        params = {
            'from': srcLang,
            'to': dstLang,
            'query': keyword,
            'simple_means_flag': '3',
            'sign': sign,
            'token': token,
            'domain': 'common',
        }

        result = get_transtion(params)
        print(result, end="\n\n")
        time.sleep(.2)


if __name__ == '__main__':
    main()
