import hashlib

if __name__ == '__main__':
    s = hashlib.sha1(bytes('我们ckaghgakjg回复晚了还v', encoding='utf8'))
    result = s.hexdigest()
    print(result, len(result))