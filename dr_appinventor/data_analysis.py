import os
import sys
import csv
import appInstructor as AI
import json 


#print("argument list :",json.loads(sys.argv[1]))
server_forms=json.loads(sys.argv[1])
server_blocks=sys.argv[2].split("_/_,")
server_blocks[-1]=server_blocks[-1][:-3]

# print("argument list :",blocks[1])

sys.setrecursionlimit(2048)


results = []
blocks = []

total = 0
data, bl = AI.extract_data(server_blocks,server_forms)

if data != 0:
    for key in data:
        total += data[key]
    data['total'] = total
    results.append(data)
if bl != 0:
    blocks.append(bl)

max_score=len(data)*3
medium=max_score/3
high=max_score*2/3

print(data)

if total <= medium:
    print("Basic")
elif total <= high:
    print("Medium")
else:
    print("High")




