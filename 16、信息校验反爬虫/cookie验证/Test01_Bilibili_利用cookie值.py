from pprint import pprint

import requests

cookie = "SESSDATA=00ce51e7%2C1630761443%2C6badc%2A31; bili_jct=ec828e0ba5a2202b748ea45f243e2046; DedeUserID=27345552; DedeUserID__ckMd5=d73274041eb1b2fa; sid=9s39u9l4"

headers = {
    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
    # 'cookie': cookie
}

url = 'https://space.bilibili.com/27345552/favlist'
data_url = "https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=27345552&jsonp=jsonp"
r = requests.get(data_url, headers=headers, cookies={key_value.split("=")[0]: key_value.split("=")[-1] for key_value in cookie.split("; ")})
pprint(r.json())