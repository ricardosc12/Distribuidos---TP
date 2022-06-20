// import routes
exportRoute('Usuarios')
exportRoute('Propostas')
exportRoute('Modal/Proposta')
exportRoute('Modal/CartasProposta')
//

let $MARK = null

function Header(){
    return /*html*/`
        <div class="app-header">
            <div class="person_icon"></div>
            <div id="side_inventario" class="header-option" onclick="goRoute('inventario')">
                ${iconBack()}
                <p>Inventário</p>
            </div>
            <div id="side_cartas" class="header-option" onclick="goRoute('cartas')">
                ${iconPlanet()}
                <p>Cartas</p>
            </div>
            <div id="side_propostas" class="header-option" onclick="goRoute('propostas')">
                ${iconHand()}
                <p>Propostas</p>
            </div>
            <div id="side_usuarios" class="header-option" onclick="goRoute('usuarios')">
                ${iconPeople()}
                <p>Usuários</p>
            </div>
            <div class='header-option header-option-logout' onclick="logout()">
                ${iconClose()}
                <p>Sair</p>
            </div>
        </div>
    `
}

setTimeout(()=>{
    $APP().innerHTML = Header() + $APP().innerHTML

    goRoute('cartas')
    // goRoute_ = goRoute
    // if(!$AUTH){
        // goRoute('auth')
    // }
},200)

function goRoute(route){
    markSide(route)
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

function markSide(route){
    if (route=='auth') return
    if($MARK){
        getId("side_"+$MARK).classList.remove('mark-side')
        getId("side_"+route).classList.add('mark-side')
    }
    else{
        getId("side_"+route).classList.add('mark-side')
    }
    $MARK = route
}