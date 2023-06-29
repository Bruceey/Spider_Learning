"""
注意：AES加密需要
(1) 密匙（一般16位字符串）
(2) 加密模式
(3) iv
另外：加密的字符串长度必须为16的倍数
"""


from Crypto.Cipher import AES
import base64
# 初始化AES对象时传入密钥、加密模式和iv，密匙一般是16位的字符串
aes1 = AES.new('63f09k56nv2b10cf'.encode('utf8'), AES.MODE_CBC, '01pv928nv2i5ss68'.encode('utf8'))
# 待加密消息
message = "Hi!I am from the earth number 77"
print('待加密消息：%s' % message)
# 加密操作
cipher_text = aes1.encrypt(message.encode('utf8'))
print(cipher_text)
print(str(base64.b64encode(cipher_text), 'utf8'))
# # 初始化AES对象时传入与加密时相同的密钥、加密模式和iv
# aes2 = AES.new('63f09k56nv2b10cf', AES.MODE_CBC, '01pv928nv2i5ss68')
# # 解密操作
# plaint_text = aes2.decrypt(cipher_text)
# print('密文：%s' % cipher_text)
# print('明文：%s' % plaint_text.decode('utf8'))