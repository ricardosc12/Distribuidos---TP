let $APP=()=>document.getElementsByClassName('app')[0]

let goRoute_ = null // goRoute - Header

let $SERVER = false
let $AUTH = {login:'ric'}
let $CARTAS = null
let $USUARIOS = null
let $INVENTORY = null













function getCartsFromUser(user){
    cartasUser = user.cartas.map(ct=>ct.id)
    cartasToRender = []
    $CARTAS.forEach(ct => {
        if(cartasUser.includes(ct.id)){
            cartasToRender.push(ct)
        }
    });
    return cartasToRender
}

function exportRoute(src){
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('script');
    link.src  = `./src/Components/routes/${src}/index.js`;
    head.appendChild(link);
}

function importCss(css){
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = css;
    head.appendChild(link);
}

function getClass(cl){
    return document.getElementsByClassName(cl)[0]
}
function getId(id){
    return document.getElementById(id)
}

function blockApp(block){
    if (block){
        if(getClass('screen_loading')) return
        let inner = /*html*/`
        <div class="screen_loading">
            <lottie-player class="anime_lottie" src="./src/scripts/animations/load_server.json" background=transparent\  speed=1 style="width: 250px; height: 250px; opacity: 0.4;" loop autoplay></lottie-player>
            ${getTextAnimation()}
            <div class="icon_config" onclick="openModalConfig()">
                ${iconConfig(20)}
            </div>
        </div>`
        getClass('app').innerHTML+=inner
    }
    else{
        getClass('screen_loading')?.remove()
    }

}
function getTextAnimation(){
    let inner = ''
    "Conectando ao servidor ...".split('').forEach((char,index) => {
        inner+=`<span style="--i:${index+1}">${char!=' '?char:'&nbsp;'}</span>`
    });
    return /*html*/`
    <div class="waviy">
        ${inner}
    </div>`
}

function firstLetterUp(str){
    try{return str[0].toUpperCase()+str.substr(1)}
    catch {return "string null"}
}

let inventario = [
    {
        "id": 2,
        "name": "Abe Sapien",
        "qts": 1
    },
    {
        "id": 50,
        "name": "Batgirl IV",
        "qts": 1
    },
    {
        "id": 42,
        "name": "Atom II",
        "qts": 1
    },
    {
        "id": 59,
        "name": "Ben 10",
        "qts": 1
    },
    {
        "id": 38,
        "name": "Armor",
        "qts": 1
    },
    {
        "id": 224,
        "name": "Harry Potter",
        "qts": 1
    },
    {
        "id": 544,
        "name": "Warpath",
        "qts": 1
    },
    {
        "id": 69,
        "name": "Bizarro",
        "qts": 1
    }
]