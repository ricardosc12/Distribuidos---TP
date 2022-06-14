let app=()=>document.getElementsByClassName('app')[0]

let goRoute_ = null // goRoute - Header

let $AUTH = {login:'ric'}
let $CARTAS = null
let $USUARIOS = null
let $INVENTORY = null















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
