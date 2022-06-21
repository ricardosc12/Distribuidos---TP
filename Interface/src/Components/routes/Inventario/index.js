importCss('./src/Components/routes/Inventario/invetorycss.css')

let CLASS_CARTAS_INVENTORY = null
const list_cards_inventory=()=>document.getElementsByClassName("route-inventory-list")[0]

function routeInventario(){
    initInventoryRoute()
    return /*html*/`
        <div class="route-inventory">
            <div class="route-inventory-list">

            </div>
            <div class="route-inventory-filter">
                <div class="search-filter-inventory">
                    <div class="filter_atom">
                        ${iconSearch()}
                        <input oninput="filterByNameIn(this)" type="text">
                    </div>
                </div>
            </div>
        </div>
    `
}

function filterByNameIn(e){
    CLASS_CARTAS_INVENTORY.filterByName(e.value,list_cards_inventory())
}

function initInventoryRoute(){
    setTimeout(() => {
        getInventory($AUTH.login).then(resolve=>{
            if(resolve.status){
                $INVENTORY = resolve.dados
                console.log(resolve.dados)
                $AUTH.cartas = resolve.dados
                cartas = resolve.dados.map(ct=>ct.id)
                cartasToInventory = []
                if($CARTAS){
                    $CARTAS.forEach(carta => {
                        if(cartas.includes(carta.id)){
                            cartasToInventory.push(carta)
                        }
                    });
                    renderCartsInvent(cartasToInventory)
                }
            }
            else{
                notify("Não foi possível carregar inventário !")
            }
        })
        // cartas = $INVENTORY.map(ct=>ct.id)
        // cartasToInventory = []
        // if(CARDS){
        //     CARDS.forEach(carta => {
        //         if(cartas.includes(carta.id)){
        //             cartasToInventory.push(carta)
        //         }
        //     });
        //     renderCartsInvent(cartasToInventory)
        // }

    });
}

function renderCartsInvent(cards){
    let list = document.getElementsByClassName('route-inventory-list')[0]
    if(Array.isArray(cards)){
        CLASS_CARTAS_INVENTORY = new listaCartas(cards)
        list.innerHTML = CLASS_CARTAS_INVENTORY.getRenderCartas
    }
}

