// import routes

function Header(){
    return /*html*/`
        <div class="app-header">
            <div class="header-option" onclick="goRoute('inventario')">Inventário</div>
            <div class="header-option" onclick="goRoute('cartas')">Cartas</div>
            <div class="header-option" onclick="goRoute('mercado')">Mercado</div>
        </div>
    `
}

setTimeout(()=>{
    app().innerHTML = Header() + app().innerHTML
    goRoute('inventario')
    goRoute_ = goRoute
})

function goRoute(route){
    let routes = document.getElementsByClassName('routes')[0]
    switch (route) {
        case 'cartas':
            routes.innerHTML = routeCartas()
            break;
    
        case 'inventario':
            routes.innerHTML = routeInventario()
            break;

        case 'mercado':
            routes.innerHTML = routeMercado()
            break;
    }
}
