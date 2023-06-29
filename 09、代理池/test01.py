# import requests
# from fake_useragent import UserAgent
# from lxml import etree
#
# headers = {
#     'User-Agent': UserAgent().random,
# }
#
# url = 'https://www.kuaidaili.com/free/inha/'
# r = requests.get(url, headers=headers)
# tree = etree.HTML(r.text)
# proxy_list = tree.xpath('.//table//tr')
# for tr in proxy_list[1:]:
#     proxy = ':'.join(tr.xpath('./td/text()')[0:2])
#     print(proxy)

class B:
    pass

class A:
    addr = 'xxx'
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def phone(self):
        setattr(self, "phone", B())


a = A("网", 12)
print(a.__dict__)
print(a.addr)
print(a.__dict__)
# print(callable(a.phone))
# a.phone()
# print(callable(a.phone))

# print(a.name())