import threading
import time

txtA = "A"
txtB = "B"

def printA():
    while True:
        print(txtA)
        time.sleep(0.5)

def printB():
    while True:
        print(txtB)
        time.sleep(0.5)


threadA = threading.Thread(target=printA)
threadB = threading.Thread(target=printB)

threadA.start()
threadB.start()