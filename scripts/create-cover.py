"""Original local pixel-art cover. Python standard library only."""
import struct, zlib, math
W,H=1200,630
pixels=bytearray(W*H*3)
for y in range(H):
 for x in range(W):
  d=max(0,1-math.hypot((x-850)/900,(y-300)/650))
  i=(y*W+x)*3; pixels[i:i+3]=bytes((int(248-18*d),int(244-34*d),255))
def rect(x,y,w,h,c):
 for j in range(max(0,y),min(H,y+h)):
  for k in range(max(0,x),min(W,x+w)):
   i=(j*W+k)*3; pixels[i:i+3]=bytes(c)
def poly(points,c):
 for y in range(max(0,min(p[1] for p in points)),min(H,max(p[1] for p in points)+1)):
  hits=[]
  for i,(x1,y1) in enumerate(points):
   x2,y2=points[(i+1)%len(points)]
   if (y1<=y<y2) or (y2<=y<y1):hits.append(int(x1+(y-y1)*(x2-x1)/(y2-y1)))
  hits.sort()
  for a,b in zip(hits[::2],hits[1::2]):rect(a,y,b-a+1,1,c)
font={'D':['11110','10001','10001','10001','11110'],'A':['01110','10001','11111','10001','10001'],'L':['10000','10000','10000','10000','11111'],'I':['111','010','010','010','111'],'S':['11111','10000','11111','00001','11111'],'B':['11110','10001','11110','10001','11110'],'R':['11110','10001','11110','10010','10001'],'T':['11111','00100','00100','00100','00100'],'H':['10001','10001','11111','10001','10001'],'Y':['10001','01010','00100','00100','00100'],'E':['11111','10000','11110','10000','11111'],'V':['10001','10001','10001','01010','00100'],'U':['10001','10001','10001','10001','01110'],'N':['10001','11001','10101','10011','10001'],'O':['01110','10001','10001','10001','01110'],'C':['01111','10000','10000','10000','01111'],'K':['10001','10010','11100','10010','10001'],'1':['010','110','010','010','111'],' ':['000']*5}
def text(s,x,y,scale,color):
 for ch in s:
  glyph=font[ch]
  for j,row in enumerate(glyph):
   for i,bit in enumerate(row):
    if bit=='1':rect(x+i*scale,y+j*scale,scale,scale,color)
  x+=(len(glyph[0])+1)*scale
purple=(121,70,215);dark=(48,36,69)
text('DALIA',73,115,19,dark)
text('LEVEL 11',76,265,10,purple)
text('UNLOCKED',76,345,9,purple)
text('BIRTHDAY',79,465,5,(139,112,168))
poly([(675,440),(884,385),(1117,447),(907,510)],(200,178,245));poly([(675,440),(907,510),(907,565),(675,495)],(161,120,223));poly([(907,510),(1117,447),(1117,502),(907,565)],(122,82,188))
rect(822,315,43,129,(245,237,255));rect(899,315,43,129,(245,237,255));rect(812,430,55,22,purple);rect(899,430,55,22,purple)
rect(800,226,155,111,(173,134,234));rect(760,235,40,99,(188,156,241));rect(955,190,40,94,(188,156,241));rect(955,165,40,30,(251,202,165));rect(760,334,40,29,(251,202,165))
rect(811,100,135,136,(62,40,64));rect(828,125,102,92,(255,209,174));rect(811,100,135,30,(70,45,65));rect(811,130,23,88,(70,45,65));rect(927,130,20,110,(70,45,65));rect(845,154,7,10,dark);rect(900,154,7,10,dark);rect(866,187,25,5,(157,76,98));rect(816,110,30,17,(255,112,174))
poly([(865,263),(879,275),(895,263),(908,276),(879,302),(852,277)],(255,224,109))
for x,y,s in [(1050,140,24),(700,220,18),(1040,340,13),(660,90,12)]:
 poly([(x,y-s),(x+5,y-5),(x+s,y),(x+5,y+5),(x,y+s),(x-5,y+5),(x-s,y),(x-5,y-5)],(241,194,67))
raw=b''.join(b'\0'+pixels[y*W*3:(y+1)*W*3] for y in range(H))
def chunk(t,d):return struct.pack('!I',len(d))+t+d+struct.pack('!I',zlib.crc32(t+d)&0xffffffff)
with open('public/og-cover.png','wb') as f:f.write(b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('!2I5B',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(raw,9))+chunk(b'IEND',b''))
