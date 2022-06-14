import sqlite3 as sql

bd = sql.connect('../Banco/meta_verso.db')

cursor = bd.cursor()

cursor.execute("""
CREATE TABLE "Usuarios" 
(
    id integer PRIMARY KEY, 
    name varchar(20) NOT NULL, 
    login TEXT NOT NULL, 
    password TEXT NOT NULL
)
""")

cursor.execute("""
CREATE TABLE "Cartas" (
    id integer PRIMARY KEY, 
    name TEXT, 
    descricao TEXT
)
""")

cursor.execute("""
CREATE TABLE "Inventario" 
(
    id integer PRIMARY KEY,
    idCarta INTEGER,
    idUsuario INTEGER,
    qts INTEGER,
    FOREIGN KEY(idCarta) REFERENCES Cartas(id),
    FOREIGN KEY(idUsuario) REFERENCES Usuarios(id),
    UNIQUE(idCarta, idUsuario) ON CONFLICT REPLACE
)
""")

cursor.execute("""
    CREATE TRIGGER del_inventory AFTER UPDATE ON Inventario
    BEGIN
        DELETE FROM Inventario WHERE Inventario.qts = 0;
    END;
""")


cursor.execute("""
CREATE TABLE "PropostaCartas" (
    id integer PRIMARY KEY, 
    idUser INTEGER,
    idCarta INTEGER,
    qtsCarta INTEGER,
    idProposta INTEGER,
    FOREIGN KEY(idProposta) REFERENCES Propostas(id),
    FOREIGN KEY(idCarta) REFERENCES Cartas(id),
    FOREIGN KEY(idUser) REFERENCES Usuarios(id)
)
""")

cursor.execute("""
CREATE TABLE "Propostas" (
    id integer PRIMARY KEY, 
    idUserDono INTEGER,
    idUserAlvo INTEGER, 
    status TEXT,
    FOREIGN KEY(idUserDono) REFERENCES Usuarios(id),
    FOREIGN KEY(idUserAlvo) REFERENCES Usuarios(id)
)
""")

cursor.execute("""
    CREATE TRIGGER del_propostas AFTER DELETE ON Propostas
    BEGIN
        DELETE FROM PropostaCartas WHERE PropostaCartas.idProposta = old.id;
    END;
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