
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
        if(!$CARTAS){
            getCartas().then(resolve=>{
                if(resolve.status){
                    $CARTAS = resolve.dados
                    CLASS_CARTAS = new listaCartas($CARTAS)
                    list_cards().innerHTML = CLASS_CARTAS.getRenderCartas
                }
                else{
                    if(resolve.mensagem == 'reboot'){
                        notify("Falha grave, reiniciando requisição !")
                        initRoute()
                    }
                    else notify("Não foi possível carregar cartas !")
                    console.log(resolve)
                    
                }
            })
        }
        else {
            CLASS_CARTAS = new listaCartas($CARTAS)
            list_cards().innerHTML = CLASS_CARTAS.getRenderCartas
        }
    })
}

