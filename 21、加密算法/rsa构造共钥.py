"""
JavaScript代码:
e = '010001'
n = '85ec922f28cc33e35b78461cb69aac204d576f14b41f6431f0503f4c0e1d617166ceb475b4124b46d72006cc1955a422492572282aaa6b7b6c20f039a1c834bcc75e1212688eb35d6e990d9b8ebe720eed724870cfcd8498f7983cac696a9132d06a908eee010ebd26ad1aab2bedea4af77eb2905a251f078c59fa958205f491'
setMaxDigits(129)
p = new RSAKeyPair(e, '', n)
console.log(encryptedString(p, '789789'))
"""



import rsa


e = '010001'
e = int(e, 16)
n = '85ec922f28cc33e35b78461cb69aac204d576f14b41f6431f0503f4c0e1d617166ceb475b4124b46d72006cc1955a422492572282aaa6b7b6c20f039a1c834bcc75e1212688eb35d6e990d9b8ebe720eed724870cfcd8498f7983cac696a9132d06a908eee010ebd26ad1aab2bedea4af77eb2905a251f078c59fa958205f491'
n = int(n, 16)

pub_key = rsa.PublicKey(e=e, n=n)
m = rsa.encrypt('789789'.encode(),pub_key)
print(m.hex())
