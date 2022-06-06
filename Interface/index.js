const { app, BrowserWindow } = require('electron')
var net = require('net');
const { ipcMain } = require('electron')

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

  // var client = new net.Socket();
  // client.connect(5000, '127.0.0.1', function() {
  //     console.log('Connected');
  // });
  
  // client.on('data', function(data) {
  //     console.log('Received: ' + data);
  //     // client.destroy();
  // });

  // ipcMain.on('sendMessage', (event, msg) => {
  //   client.write(msg)
  //   // console.log(msg)
  //   // event.reply('getDataResponse', 'recebido !')
  // })