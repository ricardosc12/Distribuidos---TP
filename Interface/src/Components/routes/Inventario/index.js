importCss('./src/Components/routes/Inventario/invetorycss.css')

function routeInventario(){
    initInventoryRoute()
    return /*html*/`
        <div class="route-inventory">
            <div class="route-inventory-list">

            </div>
            <div class="route-inventory-filter">
                <div class="search-filter-inventory">
                    <input oninput="" type="text">
                </div>
            </div>
        </div>
    `
}

function initInventoryRoute(){
    setTimeout(() => {
        getInventory($AUTH.login).then(resolve=>{
            if(resolve.status){
                $INVENTORY = resolve.dados
                cartas = resolve.dados.map(ct=>ct.id)
                cartasToInventory = []
                if($CARTAS){
                    $CARTAS.forEach(carta => {
                        if(cartas.includes(carta.id)){
                            cartasToInventory.push(carta)
                        }
                    });
                    renderCarts(cartasToInventory)
                }
            }
        })
    });
}

function renderCarts(cards){
    let list = document.getElementsByClassName('route-inventory-list')[0]
    if(Array.isArray(cards)){
        CLASS_CARTAS = new listaCartas(cards)
        list.innerHTML = CLASS_CARTAS.getRenderCartas
    }
}
