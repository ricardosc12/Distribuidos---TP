// import routes
exportRoute('Usuarios')
exportRoute('Propostas')
exportRoute('Modal/Proposta')
exportRoute('Modal/CartasProposta')
//

function Header(){
    return /*html*/`
        <div class="app-header">
            <div class="header-option" onclick="goRoute('inventario')">Inventário</div>
            <div class="header-option" onclick="goRoute('cartas')">Cartas</div>
            <div class="header-option" onclick="goRoute('propostas')">Propostas</div>
            <div class="header-option" onclick="goRoute('usuarios')">Usuários</div>
            <div class='header-option header-option-logout' onclick="logout()">SAIR</div>
        </div>
    `
}

setTimeout(()=>{
    app().innerHTML = Header() + app().innerHTML

    goRoute('propostas')
    // goRoute_ = goRoute
    // if(!$AUTH){
        // goRoute('auth')
    // }
},200)

function goRoute(route){
    let routes = document.getElementsByClassName('routes')[0]
    switch (route) {
        case 'cartas':
            routes.innerHTML = routeCartas()
            break;

        case 'auth':
            routes.innerHTML = routeAuth()
            break;
    
        case 'inventario':
            routes.innerHTML = routeInventario()
            break;

        case 'propostas':
            routes.innerHTML = routePropostas()
            break;
    
        case 'usuarios':
            routes.innerHTML = routeUsuarios()
            break;
    }
}


function logout(){
    $AUTH = null
    goRoute('auth')
}