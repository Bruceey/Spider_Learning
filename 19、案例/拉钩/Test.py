from pprint import pprint

with open("lagou.txt") as f:
    cookie_raw = f.read()

cookies = {}

for data in cookie_raw.split('; '):
    key, value = data.split('=')
    cookies[key] = value

pprint(cookies)