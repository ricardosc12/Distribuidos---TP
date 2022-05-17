import sqlite3 as sql


class BD:
    def __init__(self):
        self.bd = sql.connect('./Banco/meta_verso.db')
        self.cursor = self.bd.cursor()
        
    def createUser(self,nome,login,password,cartas,trocas,power):

        self.cursor.execute("""
            SELECT * FROM Usuários WHERE Login = ?;
        """, (login,))

        if(len(self.cursor.fetchall())):
            print("Usuário já cadastrado !")
            return False

        self.cursor.execute("""
            INSERT INTO Usuários (Name, Login, Password, Cartas, Trocas, Power)
            VALUES (?,?,?,?,?,?)
        """,(nome,login,password,cartas,trocas,power))

        print("Usuário cadastrado com sucesso !")

        return True


    def deleteUser(self,login):
        self.cursor.execute("""
            DELETE FROM Usuários
            WHERE Login = ?
        """,(login,))

    def save(self):
        self.bd.commit()
    def close(self):
        self.bd.close()

banco = BD()
banco.createUser('Isabella','isa','12345','1:3;','0:3;',123123)
# banco.deleteUser('isa')

banco.save()
banco.close()


