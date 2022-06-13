import sqlite3 as sql
import json

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class BD:
    def __init__(self):
        self.bd = sql.connect('../Banco/meta_verso.db')
        self.bd.row_factory = dict_factory
        self.cursor = self.bd.cursor()
    
    def createUniverse(self):
        f = open('../Banco/testes.json')
        data = json.load(f)
        for i in data:
            del i['id']
        insert = []
        for x in data:
            dic = (x['name'], json.dumps(x, separators=(',', ':')))
            insert.append(dic)
        self.cursor.executemany("""
            INSERT INTO Cartas (name, descricao) VALUES (?,?);
        """, insert)
        
        
    def createUser(self,nome,login,password):

        self.cursor.execute("""
            SELECT * FROM Usuarios WHERE login = ?;
        """, (login,))

        if(len(self.cursor.fetchall())):
            print("Usuário já cadastrado !")
            return False

        self.cursor.execute("""
            INSERT INTO Usuarios (name, login, password)
            VALUES (?,?,?)
        """,(nome,login,password))

        # print(self.cursor.lastrowid)

        print("Usuário cadastrado com sucesso !")

        return True

    def getUsers(self):
        self.cursor.execute("""
            SELECT id,name,login FROM Usuarios;
        """, ())
        data = self.cursor.fetchall()
        return data

    def logarUser(self,login,password):
        self.cursor.execute("""
            SELECT id FROM Usuarios
            WHERE login=? and password=?;
        """, (login,password))
        data = self.cursor.fetchall()
        
        return True if len(data) else False


    def findUsers(self,user):
        self.cursor.execute("""
            SELECT * FROM Usuarios WHERE login in ({});
        """.format(','.join(['?']*len(user))), (user))
        data = self.cursor.fetchall()
        return data if len(data) else False
    
    def getCartas(self):
        self.cursor.execute("""
            SELECT * FROM Cartas;
        """, ())
        data = self.cursor.fetchall()
        cartas = []
        for carta in data:
            ct = carta['descricao']
            ct = json.loads(ct)
            ct['id'] = carta['id']
            # ct = json.dumps(ct, separators=(',', ':'))
            cartas.append(ct)

        return cartas

    def addInventoryById(self,user,cartas):
        user_id = self.findUsers([user])
        if user_id:
            user_id = user_id[0]['id']
        else:
            print("Usuário inexistente !")
            return False

        carts_id = list(map(lambda x: x[0],cartas))

        self.cursor.execute("""
            SELECT id FROM Cartas WHERE id IN ({})
        """.format(','.join(['?']*len(carts_id))), (carts_id))

        carts_id = list(map(lambda x: x['id'],self.cursor.fetchall()))
        values = []
        try:
            for ct in cartas:
                if int(ct[0]) in carts_id:
                    values.append((user_id,ct[0],user_id,*ct))
        except:
            print("Carta inválida")
            return False
        self.cursor.executemany("""
            INSERT OR REPLACE INTO Inventario (idUsuario, idCarta, qts) VALUES (?,?, 
            COALESCE (
                (SELECT qts FROM Inventario
                WHERE idUsuario=? AND idCarta=?),0) + ?
        )
        """, values)
        return True
    
    def getInventory(self,user):
        user_id = self.findUsers([user])
        if user_id:
            user_id = user_id[0]['id']
        else:
            print("Usuário inexistente !")
            return False

        self.cursor.execute("""
            SELECT Cartas.id, Cartas.name, Inventario.qts FROM Inventario 
            INNER JOIN Cartas ON Cartas.id = Inventario.idCarta
            WHERE Inventario.idUsuario = ?;
        """,(user_id,))
        data = self.cursor.fetchall()
        return data

    def clearInventory(self,user):
        user_id = self.findUsers([user])
        if user_id:
            user_id = user_id[0]['id']
        else:
            print("Usuário inexistente !")
            return False

        self.cursor.execute("""
            DELETE FROM Inventario WHERE idUsuario = ?;
        """,(user_id,))

        print("Inventário do usuário {} limpo !".format(user))
        return True

    def getUserId(self,user):
        user_id = self.findUsers([user])
        if user_id:
            user_id = user_id[0]['id']
        else:
            print("Usuário inexistente !")
            return False
        return user_id
    
    def verifyCartas(self,idUser,cartas):
        verify = 0
        try:
            for ct in cartas:
                self.cursor.execute("""
                    SELECT * FROM Inventario WHERE idUsuario = ? AND idCarta = ? AND qts>=?
                """,(idUser,*ct))
                data = self.cursor.fetchall()
                if(len(data)):
                    verify = verify+1
            if(verify==len(cartas)):
                return True
            return False
        except:
            print("Error")
            return False

    def createProposta(self,userAlvo, userDono, cartasAlvo, cartasDono):
        usersId = self.findUsers([userAlvo,userDono])
        # print(usersId)
        if len(usersId) == 2:
            userIdAlvo = list(filter(lambda x: x!=None,list(map(lambda x: x['id'] if x['login']==userAlvo else None,usersId))))[0]
            userIdDono = list(filter(lambda x: x!=None,list(map(lambda x: x['id'] if x['login']==userDono else None,usersId))))[0]
        else:   
            print("Usuário inexistente !")
            return False
        verifyDono = self.verifyCartas(userIdDono,cartasDono)
        verifyAlvo = self.verifyCartas(userIdAlvo,cartasAlvo)

        if(not verifyDono or not verifyAlvo):
            print("Proposta não realizada !")
            return False

        self.cursor.execute("""
            INSERT INTO Propostas(idUserDono, idUserAlvo, status) VALUES (?, ?, 'pendente')
        """,(userIdDono,userIdAlvo,))

        idProposta = self.cursor.lastrowid

        propostaDono = list(map(lambda x: (userIdDono,*x,idProposta),cartasDono))
        propostaAlvo = list(map(lambda x: (userIdAlvo,*x,idProposta),cartasAlvo))
        propostaList = propostaDono+propostaAlvo
        
        self.cursor.executemany("""
            INSERT INTO PropostaCartas(idUser, idCarta, qtsCarta, idProposta)
            VALUES (?, ?, ?, ?)
        """,propostaList)

        print('Proposta realizada !')
        return True

    def getProposta(self, user, dono):
        userId = self.getUserId(user)
        if(not userId):
            return False

        self.cursor.execute("""
            SELECT * FROM Propostas a
            INNER JOIN PropostaCartas b ON a.id = b.idProposta
            INNER JOIN Usuarios u ON u.id = a.{}
            WHERE a.{} = ?
        """.format('idUserDono' if not dono else 'idUserAlvo','idUserDono' if dono else 'idUserAlvo'),(userId,))

        resp = []

        data = self.cursor.fetchall()
        propostas = []
        for i in data:
            if(not i['idProposta'] in propostas):
                propostas.append(i['idProposta'])
        for p in propostas:
            _json = {'idProposta':p,'cartasDono':[],'cartasAlvo':[],'user':{},'status':''}
            for d in data:
                if(p == d['idProposta']):
                    _json['status'] = d['status']
                    _json['user'] = {'name':d['name'],'login':d['login']}
                    if(d['idUserDono'] == d['idUser']):
                        _json['cartasDono'].append({'carta':d['idCarta'],'qts':d['qtsCarta']})
                    if(d['idUserAlvo'] == d['idUser']):
                        _json['cartasAlvo'].append({'carta':d['idCarta'],'qts':d['qtsCarta']})
            resp.append(_json)

        return resp

    def deleteProposta(self,idProposta):
        self.cursor.execute("""
            DELETE FROM Propostas
            WHERE id = ?
        """,(idProposta,))
        return True

    def rejeitaProposta(self,id):
        self.cursor.execute("""
            UPDATE Propostas
            SET status = 'rejeitada'
            WHERE id = ? AND status='pendente'
        """,(id,))

        data = self.cursor.fetchall()
        if(not len(data)):
            print("Proposta encerrada !")
            return False
        return True
    
    def aceitaProposta(self,id):

        self.cursor.execute("""
            SELECT * FROM Propostas p INNER JOIN PropostaCartas c ON p.id = c.idProposta
            WHERE p.id = ? AND p.status = 'pendente'
        """,(id,))

        data = self.cursor.fetchall()
        if(not len(data)):
            print("Proposta encerrada !")
            return False

        updates = []

        for i in data:
            if not self.verifyCartas(i['idUser'],[(i['idCarta'],i['qtsCarta'])]):
                print("Usuário {} não tem a carta no inventário !".format(i['idUser']))
                return False
            updates.append(i)

        for up in updates:
            self.cursor.execute("""
                UPDATE Inventario
                SET qts = qts - ?
                WHERE idUsuario = ? AND idCarta = ?
            """,(up['qtsCarta'],up['idUser'],up['idCarta']))

            dest = up['idUserAlvo'] if up['idUserDono'] == up['idUser'] else up['idUserDono']

            self.cursor.execute("""
            INSERT OR REPLACE INTO Inventario (idUsuario, idCarta, qts) VALUES (?,?, 
            COALESCE (
                    (SELECT qts FROM Inventario
                    WHERE idUsuario=? AND idCarta=?),0) + ?
            )
        """, (dest,up['idCarta'],dest,up['idCarta'],up['qtsCarta']))

        self.cursor.execute("""
            UPDATE Propostas
            SET status = 'aceita'
            WHERE id = ?
        """,(id,))

        print('Proposta Aceita')
        return True

    
    def deleteUser(self,login):
        self.cursor.execute("""
            DELETE FROM Usuarios
            WHERE login = ?
        """,(login,))
    def clearCartas(self):
        self.cursor.execute("""
            DELETE FROM Cartas
        """,())

    def save(self):
        self.bd.commit()
    def close(self):
        self.bd.close()



# banco = BD()


# banco.getUsers()
# banco.createUniverse()

# banco.createUser('Ricardo','ric','12345')
# banco.createUser('Isabella','isa','12345')

# banco.createCarta('Super-Man','maveriq')
# banco.createCarta('Spider-Man','vernix')

# banco.addInventoryById('isa',[('2',1)])
# banco.addInventoryById('ric',[('2',1)])
# banco.createProposta('ric','isa',[],[('2',1)])

# print(banco.getProposta('ric',False))
# banco.aceitaProposta(1)
# banco.deleteProposta(10)

# print("INVENTARIO RIC")
# banco.getInventory('ric')
# print("INVENTARIO ISA")
# print(banco.getInventory('isa'))
# banco.findUsers(['ric','isa'])

# banco.clearInventory('isa')
# banco.clearCartas()

# cartas = banco.getCartas()
# print(cartas[0]['name'])
# print(cartas[0]['name'])

# banco.deleteUser('isa')

# banco.save()
# banco.close()


