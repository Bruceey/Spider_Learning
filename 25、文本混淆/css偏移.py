import requests
import parsel

url = 'http://localhost/confusion/flight.html'
r = requests.get(url)
html = r.text
