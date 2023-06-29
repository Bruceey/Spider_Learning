import requests
from urllib.parse import urlencode

url_base = 'https://list.iimzt.com/wp-json/wp/v2/n?'
params = {
    's': '周妍希',
    'page': 1,
}

headers = {
    # 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Plus Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36',
    'Referer': 'https://app.mmzztt.com',
}

url = url_base + urlencode(params)

r = requests.get(url, verify=False, headers=headers)
json = r.json()
print(json)
# .appkey = "5154e4aad523c32f"