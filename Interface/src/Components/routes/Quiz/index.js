importCss('./src/Components/routes/Quiz/quizcss.css')

function routeQuiz(){
    initRouteQuiz()
    return /*html*/`
    <div class="quiz-list">
        <h3>Qual é o personagem ?</h3>
        <!-- <div id="carta_random">
            ${animationCardRandom()}
        </div> -->
        ${CardD(CARDS[0],'epic')}
        <div class="filter_atom">
            <input type="text" />
        </div>
    </div>
`
}


function initRouteQuiz(){
    setTimeout(() => {
        
    });
}



function CardD(card,raridade){
    return /*html*/`
    <div class='card_shadow ${raridade} max'>
        <div key=${card.id} class='card max' image=${card.image}>
           <img src="${$PATH}/assets/images/heroes/${card.image}" alt="" width="auto" height="250px">
           <span>${iconPowerStatus(15)}${card.poder || 500}</span>
        </div>
    </div>
    `
}

function animationCardRandom(){
    return /*html*/`
    <lottie-player class="anime_lottie" src="./src/scripts/animations/load_card.json" background=transparent\  speed=1 style="width: 250px; height: 250px; opacity: 0.75;" loop autoplay></lottie-player>
    `
}

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