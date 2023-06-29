import base64
import hashlib

# # base64
# s = "I love you"
# r = base64.b64encode(s.encode('utf8'))
# print(r)
# print(r.decode('utf8'))
# r2 = base64.b64decode('54as6IaP5YWs5amG5YWo5ZyLaWnpoY3lgIvllYrlmI7lmI7pmpTlsrjlsJXlsJXlpJblnIvmlofljJbnhrHngpXpoK1mc2VnZWdocmRoc3Joc2hyZGh0ZGplZHRlZA==')
# print(r2.decode('utf8'))
# r3 = base64.b64decode('54as6IaP5YWs5amG5YWo5ZyLaWnpoY3lgIvllYrlmI7lmI7pmpTlsrjlsJXlsJXlpJblnIvmlofljJbnhrHngpXpoK1mc2VnZWdocmRoc3Joc2hyZGh0ZGplZHRlZA=='.encode('utf8'))
# print(r3.decode('utf8'))


# md5
s = 'I love you'
r_md5 = hashlib.md5(s.encode('utf8'))
print(r_md5.hexdigest())

r_sha1 = hashlib.sha1(s.encode('utf8'))
print(r_sha1.hexdigest())