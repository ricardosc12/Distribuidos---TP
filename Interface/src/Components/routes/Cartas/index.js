
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

const CARDS = META.map(card=>{
    // let image = card.images.lg.split('/').pop()
    card.image = card.images
    return {...card}
})
// console.log(CARDS)
let respostaUsuario = "Batman"

// let idsCartasInventario = inventario.map(x=>x['id'])
// let idsCartas = null
// let i = null
// setTimeout(() => {
//     idsCartas = $CARTAS.filter(x=>!idsCartasInventario.includes(x['id']))
//     i = Math.floor(Math.random() * idsCartas.length);
//     console.log(idsCartas[i]['name'])
// }, 500);
// // console.log(idsCartasInventario)
// // console.log(idsCartas)




function testeQuiz(e){
    

    // console.log(value)
    if(e.key == 'Enter'){
        setTimeout(() => {
            const value = getId('teste_quiz').value
            quizCartas(value)
        });
        
    }
}

function quizCartas(name){
    console.log(name)
    // let i = Math.floor(Math.random() * idsCartas.length);
    // console.log(idsCartas[i]['name'])
    if(idsCartas[i]['name'].toLowerCase().includes(name.toLowerCase())){
        console.log("Acertou")
        let id = idsCartas[i]['id']
        let idCarta = $CARTAS.filter(x=>x['id']==id)[0]?.id
        addCartas(idCarta)
    }
    else{
        console.log("Erro")
    }
}
// quizCartas( )