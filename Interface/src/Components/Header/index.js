// import routes
exportRoute('Usuarios')
exportRoute('Propostas')
exportRoute('Modal/Proposta')
exportRoute('Modal/CartasProposta')
exportRoute('Modal/Config')
exportRoute('Quiz')
//

let $MARK = null

function Header(){
    return /*html*/`
        <div class="app-header">
            <div class="person_icon">
                <img width="30px" height="30px" src="${$PATH}/assets/images/person.png" alt="">
                <p id="user_name_profile">Sistema</p>
            </div>
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
            <div id="side_quiz" class="header-option" onclick="goRoute('quiz')">
                ${iconQuiz()}
                <p>Quiz</p>
            </div>
            <div class='header-option header-option-config' onclick="openModalConfig()">
                ${iconConfig(15)}
                <p>Configuração</p>
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

    goRoute('quiz')
    // goRoute_ = goRoute
    // if(!$AUTH){
        // goRoute('auth')
    // }
},50)

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
        case 'quiz':
            routes.innerHTML = routeQuiz()
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