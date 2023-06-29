import requests

url = 'http://www.dianping.com/shop/G8svaNSPiUlDoeYK/review_all'
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36",
}
# cookies = {
#     "_lxsdk_s": "177da0ca613-165-456-d1d%7C%7C836",
#     "dper": "a98ea09a3296d161d176cb92562edc56792a3f4c84c6500c7885efdac1882dc876bb8713b2a0e0af8ff048c492203d8269fa0d0afe8679a1268117b750db6af340e71dea7e42714c52761975843bfe936f9907b479727d7803485469a5d4634e",
#     "dplet": "b8b39feb00f30f28febc9befddf35310",
#     "ctu": "ff308ddd314b23b35fa152a494d6958e8a4215232524c2a9b5050967aac599e9",
# }

r = requests.get(url, headers=headers)
print(r.text)