from fontTools.ttLib import TTFont

font = TTFont('myfont.ttf')
cMap = font.getBestCmap()
print(cMap)

