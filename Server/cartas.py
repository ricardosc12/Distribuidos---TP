import json
  
f = open('./Banco/testes.json')
  
data = json.load(f)

insert = []

for i in data:
    del i['id']
    # aux=aux+1
    # print(i['image'])


teste = data[0:2]
for x in teste:
    dic = (x['name'], json.dumps(x, separators=(',', ':')))
    insert.append(dic)

print(insert)

# print(text[0])

# f.close()

# with open('./Banco/testes.json', 'w') as f:
#     for i in range(len(data)):
#         data[i]['image'] = data[i]['images']['lg'].split("/").pop()
#     json.dump(data, f)
