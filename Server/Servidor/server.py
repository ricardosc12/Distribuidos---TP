# -*- coding: utf-8 -*-
import socket
from controller import *
import threading
import os
import subprocess
import multiprocessing
import queue
import signal

HOST = ''
PORT = 23123

class Server:

    def __init__(self,ip,port):
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.server.bind((ip,port))
        self.server.listen(10)
        self.controller = Controller()
        print("\n\033[1;35m[*] On: {} - {}\033[0;0m\n".format(ip,port))
    
    def handler(self):
        while True:
            cliente, addr = self.server.accept()
            thread = threading.Thread(target=self.handlerClient,args=(cliente,addr,))
            thread.start()

    def handlerThread(self):
        thread = threading.Thread(target=self.handler)
        thread.start()
    
    def handlerClient(self,cliente,addr):
        print("\n\033[1;94m[*] Conexao recebida de: {} - {}\033[0;0m\n".format(addr[0],addr[1]))
        while True:
            try:
                msg = cliente.recv(1024).decode()
                print("Cliente: {}-{} \033[1;31m Mensagem: {}\033[0;0m".format(addr[0],addr[1],msg))   
                resp = self.controller.executeOperation(msg)
                if(resp):
                    cliente.sendall(resp.encode())
                if not msg: 
                    print("\033[1;94m[*] ID: {} - {} Desconecado\033[0;0m".format(addr[0],addr[1]))
                    break
            except Exception as e:
                print(e)
                print("\033[1;94m[*] ID: {} - {} Desconecado\033[0;0m".format(addr[0],addr[1]))
                break


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
    server = Server(HOST,PORT)
    server.handlerThread()
    main()
except KeyboardInterrupt:
    os.kill(os.getpid(),signal.SIGKILL)
