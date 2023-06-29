import rsa


# 1、常规用法
def rsaEncrypt(str, publicKey):
    """加密"""
    # 明文编码格式
    content = str.encode("utf-8")
    # 公钥加密
    encrypt = rsa.encrypt(content, publicKey)
    return encrypt


def rsaDecrypt(bytes_str, privateKey):
    content = rsa.decrypt(bytes_str, privateKey)
    return content.decode('utf8')

# 2、保存公钥和私钥
def saveKey(publicKey, privateKey):
    publicKey_bytes = publicKey.save_pkcs1()
    with open('public.pem', 'wb') as f:
        f.write(publicKey_bytes)

    privateKey_bytes = privateKey.save_pkcs1()
    with open('private.pem', 'wb') as f:
        f.write(privateKey_bytes)


# 3、加载本地key到程序中
def loadKey():
    with open('public.pem', 'rb') as f:
        publicKey_bytes = f.read()
        publicKey = rsa.PublicKey.load_pkcs1(publicKey_bytes)
    with open('private.pem', 'rb') as f:
        privateKey_bytes = f.read()
        privateKey = rsa.PrivateKey.load_pkcs1(privateKey_bytes)
    return publicKey, privateKey


if __name__ == '__main__':
    # 生成公钥、私钥
    (publicKey, privateKey) = rsa.newkeys(512)
    print("公钥:\n%s\n私钥:\n:%s" % (publicKey, privateKey))
    # 保存到本地
    saveKey(publicKey, privateKey)

    # # 加载到程序中
    # publicKey, privateKey = loadKey()
    #
    # # 加密
    # s = "问世间情为何物，直教人生死相许！"
    # encode_str = rsaEncrypt(s, publicKey)
    # print(encode_str)
    # # 解密
    # decode_str = rsaDecrypt(encode_str, privateKey)
    # print(decode_str)
    #
    # # 4、签名验证
    # sign = rsa.sign(s.encode('utf8'), privateKey, "SHA-256")
    # verify = rsa.verify(s.encode('utf8'), sign, publicKey)
    # print(verify)