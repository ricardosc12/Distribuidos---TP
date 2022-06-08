import json
  
f = open('./Banco/testes.json')
  
data = json.load(f)

for i in data:
    aux=aux+1
    print(i['image'])


# f.close()

# with open('./Banco/testes.json', 'w') as f:
#     for i in range(len(data)):
#         data[i]['image'] = data[i]['images']['lg'].split("/").pop()
#     json.dump(data, f)