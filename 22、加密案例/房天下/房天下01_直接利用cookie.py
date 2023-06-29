import requests

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36',
    'cookie': 'sfut=60AA8DDFC8119B18393920EEAC41F311B4EA3FAB16E14D8F677A09A1D35679796D3F1358A8E0627956E5B60DB428D68C3AA168B695F8A461D62433B96573E1CB37464767F3EA003780C3C23472C7CF805A974EA651B5E8D4A536B7FEA73A045E',
}

url = 'https://my.fang.com/'
r = requests.get(url, headers=headers)
print('让往事随风' in r.text)
print(r.text)

