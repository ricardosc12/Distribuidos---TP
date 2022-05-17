import sqlite3 as sql

bd = sql.connect('./Banco/meta_verso.db')

cursor = bd.cursor()

cursor.execute("""

CREATE TABLE "Usuários" 
(
    ID integer PRIMARY KEY, 
    Name varchar(20), 
    Login TEXT, 
    Password TEXT, 
    Cartas TEXT, 
    Trocas TEXT, 
    Power INTEGER)
""")

cursor.execute("""
CREATE TABLE "Trocas" (
    ID integer PRIMARY KEY, 
    UsuárioAlvo INTEGER, 
    Cartas TEXT, 
    Usuário INTEGER
)
""")

cursor.execute("""
CREATE TABLE "Cartas" (
    ID integer PRIMARY KEY, 
    Name TEXT, 
    Slug TEXT, 
    PowerStats TEXT, 
    Appearance TEXT, 
    Biography TEXT, 
    Work TEXT, 
    Connections TEXT, 
    Images TEXT)
""")

bd.close()