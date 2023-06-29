import requests
from urllib.parse import urljoin
import re

url = "http://localhost/confusion/food.html"
r = requests.get(url)
html = r.text
food_css = re.findall(r'<link href="(.*?)" rel="stylesheet">', html)[-1]
food_css_url = urljoin(url, food_css)
r2 = requests.get(food_css_url)
food_css_html = r2.text
className_x_y = re.findall(r'\.(v\w*?)\s*?{\s*?background: -(\d*?)px -(\d*?)px', food_css_html, re.S)
className_x_y = {item[0]: item[1:] for item in className_x_y}
food_svg = re.search(r'url\((.*?)\)', food_css_html).group(1)
food_svg_url = urljoin(food_css_url, food_svg)
food_svg_html = requests.get(food_svg_url).text


def get_real_char(className):
    x, y = className_x_y[className]
