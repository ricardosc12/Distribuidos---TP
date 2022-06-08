import sqlite3 as sql

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
    
    def createCarta(self,nome,descricao):

        self.cursor.execute("""
            SELECT * FROM Cartas WHERE Name = ?;
        """, (nome,))

        data = self.cursor.fetchall()

        if(len(data)):
            print("Carta já adicionada !")
            return False

        self.cursor.execute("""
            INSERT INTO Cartas (Name, Descricao)
            VALUES (?,?)
        """,(nome,descricao))

        print("Carta adicionada !")

        return True


    def deleteUser(self,login):
        self.cursor.execute("""
            DELETE FROM Usuarios
            WHERE Login = ?
        """,(login,))

    def save(self):
        self.bd.commit()
    def close(self):
        self.bd.close()

banco = BD()
banco.createUser('Ricardo','ric','12345')
banco.createUser('Isabella','isa','12345')
banco.createCarta('Super-Man','maveriq')
banco.createCarta('Spider-Man','vernix')
# banco.deleteUser('isa')

banco.save()
banco.close()


