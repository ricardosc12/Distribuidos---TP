import sqlite3 as sql
import json

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class BD:
    def __init__(self):
        self.bd = sql.connect('./Banco/meta_verso.db')
        self.bd.row_factory = dict_factory
        self.cursor = self.bd.cursor()
    
    def createUniverse(self):
        f = open('./Banco/testes.json')
        data = json.load(f)
        for i in data:
            del i['id']
        insert = []
        for x in data:
            dic = (x['name'], json.dumps(x, separators=(',', ':')))
            insert.append(dic)
        self.cursor.executemany("""
            INSERT INTO Cartas (Name, Descricao) VALUES (?,?);
        """, insert)
        
        
    def createUser(self,nome,login,password):

        self.cursor.execute("""
            SELECT * FROM Usuarios WHERE Login = ?;
        """, (login,))

        if(len(self.cursor.fetchall())):
            print("Usuário já cadastrado !")
            return False

        self.cursor.execute("""
            INSERT INTO Usuarios (Name, Login, Password)
            VALUES (?,?,?)
        """,(nome,login,password))

        print("Usuário cadastrado com sucesso !")

        return True

    def findUsers(self,user):
        self.cursor.execute("""
            SELECT * FROM Usuarios WHERE Login in ({});
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
            ct = carta['Descricao']
            ct = json.loads(ct)
            ct['id'] = carta['ID']
            cartas.append(ct)
        return json.dumps(cartas, separators=(',', ':'))

    def addInventoryById(self,user,cartas):
        user_id = self.findUsers([user])
        if user_id:
            user_id = user_id[0]['ID']
        else:
            print("Usuário inexistente !")
            return False

        self.cursor.execute("""
            SELECT ID FROM Cartas WHERE ID IN ({})
        """.format(','.join(['?']*len(cartas))), (cartas))

        values = list(map(lambda x: (user_id,x['ID']),self.cursor.fetchall()))

        self.cursor.executemany("""
            INSERT INTO Inventario (ID_Usuario, ID_Carta) VALUES (?,?);
        """, values)

    def clearInventory(self,user):
        user_id = self.findUsers([user])
        if user_id:
            user_id = user_id[0]['ID']
        else:
            print("Usuário inexistente !")
            return False

        self.cursor.execute("""
            DELETE FROM Inventario WHERE ID_Usuario = ?;
        """,(user_id,))

        print("Inventário do usuário {} limpo !".format(user))
        return True


    def deleteUser(self,login):
        self.cursor.execute("""
            DELETE FROM Usuarios
            WHERE Login = ?
        """,(login,))
    def clearCartas(self):
        self.cursor.execute("""
            DELETE FROM Cartas
        """,())

    def save(self):
        self.bd.commit()
    def close(self):
        self.bd.close()

banco = BD()
# banco.createUniverse()

# banco.createUser('Ricardo','ric','12345')
# banco.createUser('Isabella','isa','12345')

# banco.createCarta('Super-Man','maveriq')
# banco.createCarta('Spider-Man','vernix')


banco.addInventoryById('ric',['700'])
# banco.findUsers(['ric','isa'])

# banco.clearInventory('ric')
# banco.clearCartas()

# cartas = json.loads(banco.getCartas())
# print(len(cartas))
# print(cartas[0]['id'])

# banco.deleteUser('isa')

banco.save()
banco.close()


