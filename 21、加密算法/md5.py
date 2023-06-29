import hashlib

if __name__ == '__main__':
    m = hashlib.md5(bytes('我们vssbdnrtsavs', encoding='utf8'))
    print(bytes('我们', encoding='utf8'))
    result = m.hexdigest()
    print(result, len(result))