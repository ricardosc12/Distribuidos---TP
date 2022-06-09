import sqlite3 as sql

bd = sql.connect('../Banco/meta_verso.db')

cursor = bd.cursor()

cursor.execute("""
CREATE TABLE "Usuarios" 
(
    ID integer PRIMARY KEY, 
    Name varchar(20), 
    Login TEXT, 
    Password TEXT)
""")

cursor.execute("""
CREATE TABLE "Cartas" (
    ID integer PRIMARY KEY, 
    Name TEXT, 
    Descricao TEXT
)
""")

cursor.execute("""
CREATE TABLE "Inventario" 
(
    ID integer PRIMARY KEY,
    ID_Carta INTEGER,
    ID_Usuario INTEGER,
    FOREIGN KEY(ID_Carta) REFERENCES Cartas(ID),
    FOREIGN KEY(ID_Usuario) REFERENCES Usuarios(ID)
)
""")

cursor.execute("""
CREATE TABLE "Trocas" (
    ID integer PRIMARY KEY, 
    UsuárioAlvo INTEGER, 
    Cartas TEXT, 
    Usuário INTEGER
)
""")

bd.close()


# def createCarta(self,nome,descricao):

#     self.cursor.execute("""
#         SELECT * FROM Cartas WHERE Name = ?;
#     """, (nome,))

#     data = self.cursor.fetchall()

#     if(len(data)):
#         print("Carta já adicionada !")
#         return False

#     self.cursor.execute("""
#         INSERT INTO Cartas (Name, Descricao)
#         VALUES (?,?)
#     """,(nome,descricao))

#     print("Carta adicionada !")

#     return True