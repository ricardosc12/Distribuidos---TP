const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname);
var net = require('net');
const { ipcMain } = require('electron')
var promiseIpc = require('electron-promise-ipc') 
const assetsPath = app.isPackaged ? ".." : ".";
const request = require('request');

let PORT = 23123
let HOST = '127.0.0.1'
let serverLive = true


function requestServer(method,api,body){
  if(method=='post')
    return new Promise(resolve=>{
        request.post(`http://${HOST}:${PORT}/${api}`,{json:JSON.parse(body)},(err,resp,body)=>{
          resolve(body)
        })
    })
  else {
    return new Promise(resolve=>{
      let url = `http://${HOST}:${PORT}/${api}`
        request({url},(err,resp,body)=>{
          if(!body || body.includes('Error')) {
            resolve({'status':false,'mensagem':'Erro no servidor !'})
            return
          }
          body = JSON.parse(body)
          resolve(body)
        })
     })
  }
}

function serverALive(){
    let url = `http://${HOST}:${PORT}`
    request({url},(err,resp,body)=>{serverLive = body?true:false})
}

serverALive()
setInterval(() => {
  serverALive()
}, 2000);

function getApi(rq){
  let api = {
    'lu':{metodo:'post',api:'logarUser'},
    'cu':{metodo:'post',api:'createUser'},
    'gu':{metodo:'get',api:'getUsers'},
    'gi':{metodo:'post',api:'getInventory'},
    'gc':{metodo:'get',api:'getCartas'},
    'ac':{metodo:'post',api:'addCarta'},
    'cp':{metodo:'post',api:'createProposta'},
    'gp':{metodo:'post',api:'getProposta'},
    'ap':{metodo:'post',api:'aceitaProposta'},
    'rp':{metodo:'post',api:'rejeitaProposta'}
  }
  let [aux, url, body] = rq.split('$')
  return [api[url].metodo,api[url].api,body]
}

function sendMessage(request){
  return new Promise(resolve=>{
      let [metodo,api,body] = getApi(request)
      resolve(requestServer(metodo,api,body))
  })
}

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1366,
      height: 786,
      transparent:true,
      frame:false,
      // customFileProtocol:"           ./",
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
