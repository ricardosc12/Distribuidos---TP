# -*- coding: utf-8 -*-
from controller import *
import threading
import os
import signal
import sys
from flask import Flask
from flask import request
import json

class JSON:
    def __init__(self):
        self.json = "JSON"
    def string(self,dic):
        return json.dumps(dic, separators=(',', ':'))
    def parse(self,string):
        return json.loads(string)

JSON = JSON()

try:
    HOST = str(sys.argv[1])
    PORT = int(sys.argv[2])
except:
    HOST = ''
    PORT = 23123

class WebService:
    def __init__(self):
        self.app = Flask(__name__)
        self.controller = Controller()

        @self.app.route('/')
        def index():
            return 'top'
        
        @self.app.route('/logarUser', methods = ['POST'])
        def logarUser():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.logarUser(data)
            return resp
        
        @self.app.route('/createUser', methods = ['POST'])
        def createUser():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.createUser(data)
            return resp
        
        @self.app.route('/getCartas')
        def getCartas():
            resp = self.controller.getCartas()
            return resp
        
        @self.app.route('/getUsers')
        def getUsers():
            resp = self.controller.getUsers()
            return resp
        
        @self.app.route('/getInventory', methods=['POST'])
        def getInventory():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.getInventory(data)
            return resp
        
        @self.app.route('/addCarta', methods=['POST'])
        def addCarta():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.addCarta(data)
            return resp
       
        @self.app.route('/createProposta', methods=['POST'])
        def createProposta():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.createProposta(data)
            return resp
            
        @self.app.route('/getProposta', methods=['POST'])
        def getProposta():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.getProposta(data)
            return resp

        @self.app.route('/aceitaProposta', methods=['POST'])
        def aceitaProposta():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.aceitaProposta(data)
            return resp
            
        @self.app.route('/rejeitaProposta', methods=['POST'])
        def rejeitaProposta():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            resp = self.controller.rejeitaProposta(data)
            return resp


    def run(self):
        self.app.run(debug=False, host=HOST, port=PORT)
    





def main():
    while True:
        try:
            kill=input()
            if(kill=='cls'):
                os.system('clear')
                print("\n\033[1;35m[*] On: {} - {}\033[0;0m\n".format(HOST,PORT))
        except KeyboardInterrupt:
            os.kill(os.getpid(),signal.SIGKILL)

try:
    thread = threading.Thread(target=main)
    thread.start()
    web_service = WebService()
    web_service.run()
except KeyboardInterrupt:
    os.kill(os.getpid(),signal.SIGKILL)

