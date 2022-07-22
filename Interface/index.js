const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname);
var net = require('net');
const { ipcMain } = require('electron')
var promiseIpc = require('electron-promise-ipc') 
const assetsPath = app.isPackaged ? ".." : ".";

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = `./controller.proto`;
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
  
const packageDefinition = protoLoader.loadSync(PROTO_PATH,options);
const Controller = grpc.loadPackageDefinition(packageDefinition).controller.Controller;

let PORT = 23123
let HOST = '127.0.0.1'
let serverLive = true

let client_grpc = new Controller(`${HOST}:${PORT}`,
    grpc.credentials.createInsecure())

function sendMessage(request){
  return new Promise(resolve=>{
    client_grpc.executeOperation({message:request}, (error, response) => {

          if(error && error.code === 14){
            // Server desconectado
            resolve({status:false,message:"Servidor desconectado !"})
          }
          else {
            resolve(JSON.parse(response.message))
          }
      });
  })
}

function serverAlive(){
    let timeout = new Date( Date.now() + 2000)
    client_grpc.serverAlive({},{deadline:timeout},(error,response) => {
        if(error && (error.code===14 || error.code===4)){
          serverLive=false
        }
        else{serverLive=true}
    })
}

serverAlive()
setInterval(() => {
  serverAlive()
}, 2000);

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1366,
      height: 786,
      transparent:true,
      frame:false,
      // customFileProtocol:"./",
      // backgroundColor:"red",
      // show: false,
      icon: `${assetsPath}/assets/images/icon_r.png`,
      webPreferences: {
        devTools: false,
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
    }
    })
    // win.webContents.openDevTools()
    win.loadFile('index.html')

    // win.once('ready-to-show', () => {
    //     win.show()
    // })
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })


  

 
  ipcMain.on('serverLive', (event, arg) => {
    event.returnValue = serverLive
  })
  ipcMain.on('devMode', (event, arg) => {
    event.returnValue = assetsPath
  })
  ipcMain.on('closeApp', (event, arg) => {
    app.quit()
    event.returnValue = true
  })
  ipcMain.on('miniApp', (event, arg) => {
    BrowserWindow.getFocusedWindow().minimize();
    event.returnValue = true
  })
  
  ipcMain.on('changeServer', (event, {host,port}) => {
    HOST = host
    PORT = port
    event.returnValue = true
  })

  
  promiseIpc.on('request', (request, event) => {
    return sendMessage(request)
  });
