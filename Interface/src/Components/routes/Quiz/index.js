importCss('./src/Components/routes/Quiz/quizcss.css')

function routeQuiz(){
    initRouteQuiz()
    return /*html*/`
    <div class="quiz-list">
        <h3>Qual é o personagem ?</h3>
        <div id="carta_random">
            <!-- ${CardD(CARDS[0],'epic')} -->
            ${animationCardRandom()}
        </div>
        <div onkeydown="pressToQuiz(event)" class="input-area-quiz">
            <div id="quiz-field" class="filter_atom">
                <input id="quiz-input" type="text" />
            </div>
            <div class="field-area-quiz">
                <button onclick="quizResp()">Jogar ${iconPlayCard()}</button>
                ${iconRefresh(generateQuiz)}
            </div>
            
        </div>
    </div>
`
}

let randomCarta = null

function pressToQuiz(e) {
    if(e.key=='Enter'){
        quizResp()
    }
}   

function initRouteQuiz(){
    randomCarta = null
    setTimeout(() => {
        if(!$CARTAS){
            notify("Carregue as cartas primeiro !")
            return
        }
        else if(!$INVENTORY){
            getInventory($AUTH.login).then(resolve=>{
                console.log(resolve)
                if(resolve.status){
                    $INVENTORY = resolve.dados
                    generateQuiz()
                }
                else{
                    notify("Não foi possível carregar inventário !")
                }
            })
        }
        else {
            generateQuiz()
        }
    });
}
let $TIMER_GENERATE_CART
function generateQuiz(){
    clearTimeout($TIMER_GENERATE_CART)
    randomCarta = null
    getId('carta_random').innerHTML = animationCardRandom()
    $TIMER_GENERATE_CART = setTimeout(() => {
        let idsCartasInventario = $INVENTORY.map(x=>x['id'])
        let idsCartasToRandom = $CARTAS.filter(x=>!idsCartasInventario.includes(x['id']))
        let idRandom = Math.floor(Math.random()*idsCartasToRandom.length)
        randomCarta = idsCartasToRandom[idRandom]
        let cardHtml = getCreateRender(getCartsFromUser({cartas:[randomCarta]}),true,CardD)
        getId('carta_random').innerHTML = cardHtml
    }, 700);
}

let $TIMER_QUIZ = null



function quizResp(){
    try{
        let nameQuiz = processString(getId('quiz-input').value)
        let nameCarta = processString(randomCarta.name)
        if(nameQuiz.includes(nameCarta)){
            addCartas(randomCarta.id)
            $INVENTORY = [...$INVENTORY,{id:randomCarta.id,name:randomCarta.name,qts:1}]
            notify(`${randomCarta.name} adicionado(a) ao inventário !`)
            generateQuiz()
        }
        else{
            quizError()
        }
    }catch{}
}

function quizError(){
    clearTimeout($TIMER_QUIZ)
    getId('quiz-field').classList.add('shake')
    $TIMER_QUIZ = setTimeout(()=>{
        getId('quiz-field').classList.remove('shake')
    },700)
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