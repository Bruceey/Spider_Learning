import requests

headers = {
    "user-agent": 'fwjffoython'
}

r = requests.get('http://172.16.211.4:8205/verify/uas/index.html', headers=headers)
print(r.text)