# -*- coding: utf-8 -*-
from bd import *
import json

class JSON:
    def __init__(self):
        self.json = "JSON"
    def string(self,dic):
        return json.dumps(dic, separators=(',', ':'))
    def parse(self,string):
        return json.loads(string)

JSON = JSON()

# banco = BD()
# banco.createUniverse()
# banco.createUser('Ricardo','ric',123)
# banco.save()
# banco.close()
# createUniverse(self)
# createUser(self,nome,login,password)
# getCartas()
# clearCartas(self)
# addInventoryById(self,user,cartas)
# getInventory(self,user)
# clearInventory(self,user)
# createProposta(self,userAlvo, userDono, cartasAlvo, cartasDono)
# getProposta(self, user, dono)
# rejeitaProposta(self,id)
# aceitaProposta(self,id)
# deleteUser(self,login)

# dic = {  #Criar Usuário
#     'nome':'Ricardo',
#     'login':'ric',
#     'password':123
# }

# dic = {  #Adicionar à inventário
#     'user':'ric',
#     'cartas':[
#         {'id':1,'qts':1},
#         {'id':5,'qts':1},
#     ]
# }

# dic = {  #Criar Proposta
#     'user':'ric',
#     'userAlvo':'isa',
#     'cartas':[
#         {'id':1,'qts':1},
#         {'id':5,'qts':1},
#     ],
#     'cartasAlvo':[
#         {'id':1,'qts':1},
#         {'id':5,'qts':1},
#     ]
# }


# msg = "$cu${}".format(JSON.string(dic))


class Controller:

    def __init__(self):
        self.routes = [
            'lu',    # 'logarUser',
            'cu',    # 'createUser',
            'gu',    # 'getUsers',
            'gi',    # 'getInventory',
            'gc',    # 'getCartas',
            'ac',    # 'addCarta',
            'cp',    # 'createProposta',
            'gp',    # 'getProposta',
            'ap',    # 'aceitaProposta',
            'rp',    # 'rejeitaProposta',
        ]
    
    def toString(self,dic):
        return json.dumps(dic, separators=(',', ':'))

    
    def executeOperation(self,msg):
        try:
            api, body = msg.split('$')[1:3]
        except:
            print("Operação inválida !")
            return JSON.string({'status':False,'mensagem':'Formato inválido !'})
        if(not api in self.routes):
            print("Rota inválida !")
            return JSON.string({'status':False,'mensagem':'Rota inválida !'})

        try:
            body = JSON.parse(body) if body else None
        except:
            print("Erro ao tratar body !")
            return False
        
        banco = BD()
        resp = {'status':False}

        try:
            if(api == 'lu'):
                sts = banco.logarUser(body['login'],body['password'])
                resp = {'status':True if len(sts) else False, 'dados':sts}

            if(api == 'cu'):
                resp = {'status':banco.createUser(body['nome'],body['login'],body['password'])}
            
            elif(api == 'gu'):
                resp = {'status':True,'dados':banco.getUsers()}

            elif(api == 'gi'):
                resp = banco.getInventory(body['user'])
                if resp == False:
                    resp = {'status':False,'mensagem':"Usuário inexistente"}
                else: 
                    resp = {'status':True,'dados':resp}
            
            elif(api == 'gc'):
                resp = JSON.string({'status':True,'dados':banco.getCartas()})
                return resp

            elif(api == 'ac'):
                cartas = list(map(lambda x: (x['id'],x['qts']),body['cartas']))
                if(not len(cartas)):
                    print("Parametro $cartas vazio !")
                    return JSON.string({'status':False,'mensagem':'$cartas vazio'})
                resp = banco.addInventoryById(body['user'],cartas)
                if(resp):
                    resp = {'status':True}
                else:
                    resp = {'status':False}
                
            
            elif(api == 'cp'):
                cartasDono = list(map(lambda x: (x['id'],x['qts']),body['cartas']))
                cartasAlvo = list(map(lambda x: (x['id'],x['qts']),body['cartasAlvo']))

                if(not len(cartasDono) and not len(cartasAlvo)):
                    print("Troca entre usuários, mas nenhuma carta !")
                    return JSON.string({'status':False})

                resp = banco.createProposta(body['userAlvo'],body['user'],cartasAlvo,cartasDono)
                if(resp):
                    resp = {"status":True}
            
            elif(api == 'gp'):
                propostasRecebidas = banco.getProposta(body['user'],False)
                propostasFeitas = banco.getProposta(body['user'],True)
                if(propostasRecebidas != False and propostasFeitas != False):
                    resp = {'status':True,
                    'dados':{
                        'recebidas':propostasRecebidas,
                        'feitas':propostasFeitas
                    }}
                else:
                    resp = {'status':False,'mensagem':'Usuário inexistente'}

            elif(api == 'ap'):
                resp = banco.aceitaProposta(body['id'])
                if(resp==True):
                    resp = {'status':True}
                elif (resp==-1):
                    resp = {'status':False,'mensagem':'Usuários não possuem mais as cartas necessárias !'}
                else:
                    resp = {'status':False,'mensagem':'Proposta encerrada !'}
            
            elif(api == 'rp'):
                resp = banco.rejeitaProposta(body['id'])
                if(resp):
                    resp = {'status':True}
                else:
                    resp = {'status':False,'mensagem':'Proposta encerrada !'}

        except:
            print("Erro ao realizar operação !")
            return JSON.string({'status':False})

        banco.save()
        banco.close()
        return JSON.string(resp)