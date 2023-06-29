import requests
import parsel

from pprint import pprint

url = 'http://172.16.211.4/confusion/flight.html'

r = requests.get(url)
selector = parsel.Selector(r.text)

ems = selector.css('.rel')
for em in ems:
    first_b = em.xpath('')
pprint(ems)


