// const { BrowserWindow } = require('@electron/remote')
const ipc = require('electron').ipcRenderer;
const promiseIpc = require('electron-promise-ipc') 
const { ipcRenderer } = require('electron')


ipcRenderer.on('serverLive',(event,resp) => {
    console.log(resp)
})

function createBody(route,body){
    return `$${route}$${JSON.stringify(body)}`
}

function sendMessage(mensagem){
    if(!mensagem) return
    ipcRenderer.send('sendMessage',mensagem)
}

setInterval(() => {
    console.log(ipcRenderer.sendSync('serverLive'))
}, 2000);

setTimeout(() => {
    promiseIpc.send('request',"$gu$").then(resp=>{
        resp = JSON.parse(resp)
        console.log(resp)
    })
}, 3000);

function requestServer(req){
    return promiseIpc.send('request',req)
}

function createUser(name,login,password){
    let request = {
        nome:name,
        login:login,
        password:password
    }
    request = createBody('cu',request)
    console.log(request)
}