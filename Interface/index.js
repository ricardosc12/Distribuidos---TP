const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname);
var net = require('net');
const { ipcMain } = require('electron')
var promiseIpc = require('electron-promise-ipc') 
const assetsPath = app.isPackaged ? ".." : ".";


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


  let serverLive = false
  let dataReceived = ''
  let received = ''
  let bigdata = false


  var client = new net.Socket();
  let PORT = 23123
  let HOST = '127.0.0.1'

  client.on('connect', function() {
    console.log('Connected');
    serverLive=true
  });

  connectToServer=()=>{
    client.connect(PORT, HOST)
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
    client.destroy()
    event.returnValue = true
  })

  let $TIMER = null
  
  promiseIpc.on('request', (resp, event) => {
    client.write(resp);

    return new Promise(resolve=>{
      $TIMER = setInterval(()=>{
        if(dataReceived){
          clearInterval($TIMER)
          aux = dataReceived
          dataReceived = ''
          try{
            resolve(JSON.parse(aux))
          }
          catch{
            resolve({status:false,mensagem:"reboot"})
            aux = ''
            dataReceived = ''
            received=''
            bigdata = false
          }
        }
       })
    })
  });