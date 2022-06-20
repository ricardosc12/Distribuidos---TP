const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname);
var net = require('net');
const { ipcMain } = require('electron')
var promiseIpc = require('electron-promise-ipc') 
const assetsPath = app.isPackaged ? ".." : ".";

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1600,
      height: 720,
      transparent:true,
      frame:false,
      // customFileProtocol:"./",
      // backgroundColor:"red",
      // show: false,
      webPreferences: {
        // devTools: false,
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
    }
    })
    win.webContents.openDevTools()
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

  var client = new net.Socket();
  let serverLive = false
  let dataReceived = ''
  let received = ''
  let bigdata = false

  client.on('connect', function() {
    console.log('Connected');
    serverLive=true
  });

  connectToServer=()=>{
    client.connect(23123, '192.168.1.2')
  }
  connectToServer()
  
  client.on('error', function() {
  });

  client.on('close', function() {
    console.log('Server off !');
    console.log('Reconectando...')
    serverLive=false
    setTimeout(()=>{
      connectToServer()
    },2000)
  });
  
  client.on('data', function(data) {
      data = data.toString()
      if(data.includes('$INIT$')){
          bigdata = true
          data = data.replace("$INIT$","")
          received+=data
      }
      else if (data.includes('$EOF$')){
          bigdata = false
          data = data.replace("$EOF$","")
          received+=data
          dataReceived = received
      }
      else if(bigdata){
          received+=data
      }
      else {
        dataReceived = data
      }
  });

  ipcMain.on('serverLive', (event, arg) => {
    event.returnValue = serverLive
  })
  ipcMain.on('devMode', (event, arg) => {
    event.returnValue = assetsPath
  })

  ipcMain.on('requestToServer', (event, arg) => {

    console.log("Listando usuários")
    request = "$gu$"
    client.write(request);

    event.returnValue = new Promise((resolve)=>{
      setTimeout(() => {
        resolve('asd')
      }, 1000);
    })
  })

  // let timer = setInterval(()=>{
  //   if(dataReceived){
  //     clearInterval(timer)
  //     dataReceived = ''
  //     resolve(dataReceived)
  //   }
  // },10)

  promiseIpc.on('request', (resp, event) => {
    client.write(resp);

    return new Promise(resolve=>{
      let timer = setInterval(()=>{
        if(dataReceived){
          clearInterval(timer)
          aux = dataReceived
          dataReceived = ''
          try{
            resolve(JSON.parse(aux))
          }
          catch{resolve({status:false,mensagem:"Erro grave"})}
        }
       })
    })
  });