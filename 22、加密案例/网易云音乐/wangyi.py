import requests
from pprint import pprint

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
    # "Origin": "https://passport.fang.com",
    "Referer": "https://music.163.com/",
}

start_url = 'https://music.163.com/'
# 该url中包含https://s3.music.126.net/web/s/pt_song_index_578b38e3fcbd2fdde67167c554134fe6.js?578b38e3fcbd2fdde67167c554134fe6
# 即评论的异步url
song_url = 'https://music.163.com/song?id=190072'

# session = requests.Session()
# session.headers.update(headers)

# session.get(start_url)
# r = session.get(song_url)
#
# with open('黄昏.html', 'w') as f:
#     f.write(r.text)

comment_url = 'https://music.163.com/weapi/comment/resource/comments/get?csrf_token='

data = {
    'params': 'UBIBsUDNjL2katJy0R/645MeGdvYBdYk+3o8z+rKv2AdhRyVVgYofsKmEPvz8G2A42OoprHI8plLYZ5YOrhLV0/DmV8I8WyxiGu7cxyqWBlJVU39XcqKbg/D2VBJrSGvoEzAOlkdXFLCxrVUJ8OpadSpjUsFxJvNRsOnttrQRir+fAt0+XvNYZwQwfH9nx7gpsya7BWHSNo8Qo6BDSCJZhXzraXBlALi+1uOLDX01UDFfUS/qt1Im7XbojOXil7eYkEQ62oDzQxlJJwszJc601P8vTENI8Hqm/BnthRFdck=',
    'encSecKey': 'ad2a18fd4ec99fd60851e286c018c4745fe2ae8171a652b9dca43888f7d828abaf37bfddd11e04884f3ad899a2f8715e600d0875223d1051d52751356058f8ac4425f5e2f43d7a010c52bfb9526cf683fb246c8f2421dc2287762a630c8a31babe17779d0efc1c9aa6486d7952de2f0d03aeb2b02c11a109fabf79c19b7486a9',
}

r = requests.post(comment_url, headers=headers, data=data)
pprint(r.json())
