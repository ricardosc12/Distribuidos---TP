importCss('./src/Components/routes/Modal/Config/configcss.css')

function renderModalConfig(){
    return /*html*/`
        <div onclick="closeModalConfig(event)" class="main-config-modal">
            <div onkeydown='requestInEnterS(event)' class="content-modal-config">
                <label>Host<input id="host_server" type="text"></label>
                <label>Porta<input id="port_server" oninput=maskNumber(event) type=""></label>
                <button onclick="serverChange()">Conectar</button>
            </div>
        </div>
    `
}

function requestInEnterS(e){
    if(e.key == 'Enter'){
        serverChange()
    }
}

function openModalConfig(){
    getClass('app').insertAdjacentHTML('afterend',renderModalConfig())
    setTimeout(() => {
        getClass('main-config-modal')?.classList.add('animated')
        getClass('content-modal-config')?.classList.add('animated')
    });
}
// openModalConfig()
function closeModalConfig(event,force){
    if(event && event.target.className.includes('main-config-modal') || force){
        getClass('main-config-modal')?.classList.remove('animated')
        getClass('content-modal-config')?.classList.remove('animated')
        setTimeout(() => {
            getClass('main-config-modal')?.remove()
        }, 225);
    }
}

function serverChange(){
    notify("Função indisponível temporariamente !")
    return
    const host = getId("host_server").value
    const port = getId("port_server").value
    if(!port) {
        notify("Campo porta necessário !")
        return
    }
    if(parseInt(port)<0 || parseInt(port)>65536){
        notify("Número de porta deve ser entre 0 e 65536")
        return
    }
    notify(`Conectando a ${host || '127.0.0.1'}:${port}`)
    changeServer(host,port)
    closeModalConfig(null,true)
}

function maskNumber(e){
    const value = e.target.value.replace(/\D/g,'')
    e.target.value = value
}