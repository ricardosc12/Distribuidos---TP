# -*- coding: utf-8 -*-
import socket
from controller import *
import threading
import os
import subprocess
import multiprocessing
import queue
import signal
import sys

import grpc
from concurrent import futures
import time
import controller_pb2_grpc as pb2_grpc
import controller_pb2 as pb2

try:
    HOST = str(sys.argv[1])
    PORT = int(sys.argv[2])
except:
    HOST = ''
    PORT = 23123



def main():
    while True:
        try:
            kill=input()
            if(kill=='cls'):
                os.system('clear')
                print("\n\033[1;35m[*] On: {} - {}\033[0;0m\n".format(HOST,PORT))
        except KeyboardInterrupt:
            os.kill(os.getpid(),signal.SIGKILL)


# try:
#     server = Server(HOST,PORT)
#     server.handlerThread()
#     main()
# except KeyboardInterrupt:
#     os.kill(os.getpid(),signal.SIGKILL)


class ControllerService(pb2_grpc.ControllerServicer):

    def __init__(self, *args, **kwargs):
        self.controller = Controller()
        pass

    def executeOperation(self, request, context):

        message = request.message
        print(message)
        resp = self.controller.executeOperation(message)
        result = {'message': resp}
        return pb2.MessageResponse(**result)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    
    pb2_grpc.add_ControllerServicer_to_server(ControllerService(), server)

    print("\n\033[1;35m[*] On: {} - {}\033[0;0m\n".format(HOST,PORT))
    server.add_insecure_port('[::]:{}'.format(PORT))
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    thread = threading.Thread(target=main)
    thread.start()
    serve()