
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
                    <div class="filter_atom">
                        ${iconSearch()}
                        <input oninput="filterByName(this)" type="text">
                    </div>
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
        // CLASS_CARTAS = new listaCartas(CARDS)
        // list_cards().innerHTML = CLASS_CARTAS.getRenderCartas
        if(!$CARTAS){
            getCartas().then(resolve=>{
                if(resolve.status){
                    $CARTAS = resolve.dados
                    CLASS_CARTAS = new listaCartas($CARTAS)
                    list_cards().innerHTML = CLASS_CARTAS.getRenderCartas
                }
                else{
                    notify("Não foi possível carregar cartas !")
                }
            })
        }
        else {
            CLASS_CARTAS = new listaCartas($CARTAS)
            list_cards().innerHTML = CLASS_CARTAS.getRenderCartas
        }
    })
}

const CARDS = META.map(card=>{
    // let image = card.images.lg.split('/').pop()
    card.image = card.images
    return {...card}
})


