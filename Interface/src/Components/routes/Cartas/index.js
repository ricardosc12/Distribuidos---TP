
let CLASS_CARTAS = null
const list_cards=()=>document.getElementsByClassName("route-cartas-list")[0]

function routeCartas(){
    initRoute()
    return /*html*/`
        <div class="route-cartas">
            <div class="route-cartas-list">

            </div>
            <div class="route-cartas-filter">
                <div class="search-filter">
                    <input oninput="filterByName(this)" type="text">
                </div>
            </div>
        </div>
    `
}

function filterByName(e){
    CLASS_CARTAS.filterByName(e.value,list_cards())
}

function initRoute(){
    setTimeout(()=>{
        CLASS_CARTAS = new listaCartas(CARDS) // VIRÁ da API
        list_cards().innerHTML = CLASS_CARTAS.getRenderCartas
    })
}

const CARDS = META.map(card=>{
    // let image = card.images.lg.split('/').pop()
    return {...card}
})


