with open('example2.ini', 'r+') as f:
    f.truncate(9)
    f.write('我')
    # f.write('我爱你，美杜莎！\n')
    # f.write('我爱你，云韵！\n')
    # f.write('我爱你，雅妃！\n')
    # f.write('我爱你，纳兰嫣然！\n')
    # f.write('我爱你，小医仙！\n')
    # f.write('我爱你，紫妍！\n')
    # f.write('我爱你，夭夜！\n')
    # f.seek(0, 0)
    # print(f.read())