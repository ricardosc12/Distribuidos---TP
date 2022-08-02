# -*- coding: utf-8 -*-
from cmath import exp
import socket
from controller import *
import threading
import os
import subprocess
import multiprocessing
import queue
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
            return 'Hello world'

        @self.app.route('/isa')
        def isa():
            return '<h1>Isabella</h1>'

        @self.app.route('/logarUser', methods = ['POST'])
        def logarUser():
            try:
                data = request.json
            except:
                return {"status":False,"mensage":"Dados (JSON) ausentes, Method Post"}
            print(data)
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

        @self.app.route('/getInventory')
        def getInventory():
            resp = self.controller.getInventory()
            return resp

    def run(self):
        self.app.run(debug=False, host='0.0.0.0')
    





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

