// const { BrowserWindow } = require('@electron/remote')
const ipc = require('electron').ipcRenderer;
const promiseIpc = require('electron-promise-ipc') 
const { ipcRenderer } = require('electron')


ipcRenderer.on('serverLive',(event,resp) => {
    console.log(resp)
})

function createBody(route,body){
    if(body) {
        return `$${route}$${JSON.stringify(body)}`
    }
    return `$${route}$`
    
}

function sendMessage(mensagem){
    if(!mensagem) return
    ipcRenderer.send('sendMessage',mensagem)
}

setInterval(() => {
    ipcRenderer.sendSync('serverLive')
}, 2000);

// setTimeout(() => {
//     promiseIpc.send('request',"$gu$").then(resp=>{
//         resp = JSON.parse(resp)
//         console.log(resp)
//     })
// }, 3000);

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
    return requestServer(request)
}

function logarUser(login,password){
    let request = {
        login:login,
        password:password
    }
    request = createBody('lu',request)
    return requestServer(request)
}

function getCartas(){
    request = createBody('gc')
    return requestServer(request)
}

function getUsers(){
    request = createBody('gu')
    return requestServer(request)
}

function getInventory(login){
    let request = {
        user:login,
    }
    request = createBody('gi',request)
    return requestServer(request)
}

function createProposta(request){
    request = createBody('cp',request)
    return requestServer(request)
}

function getPropostas(login){
    request = createBody('gp',{user:login})
    return requestServer(request)
}