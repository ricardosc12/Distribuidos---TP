let app=()=>document.getElementsByClassName('app')[0]

let goRoute_ = null // goRoute - Header

let auth = null
















function importCss(css){
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = css;
    head.appendChild(link);
}
