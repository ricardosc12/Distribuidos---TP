importCss('./src/Components/routes/Modal/Proposta/cssmodalproposta.css')

let mainToModal = document.getElementsByClassName("app")[0]

let $PROPOSTA = {
    cartas:{},
    cartasAlvo:{}
}
function resetVarProp(){
    $PROPOSTA = {
        cartas:{},
        cartasAlvo:{}
    }
}

function modalUser(){
    return /*html*/`
        <div id='modal-proposta' class="modal-proposta" onclick="closeModalProposta(event)">
                ${renderModal()}
        </div>
    `
}

function renderModal(anime){
    return /*html*/`
    <div class="modal-proposta-main ${anime&&'animated'}">
        <div class="header-proposta"></div>
        <div class="list-cards-user"></div>
        <div class="button-proposta">
            <button onclick="startProposta()">Proposta</button>
        </div>
    </div>
    `
}

let $USER_ALVO = null

function openModalProposta(user){
    mainToModal.insertAdjacentHTML('afterend',modalUser())
    // mainToModal.innerHTML = mainToModal.innerHTML+modalUser()
    setTimeout(() => {
        document.getElementsByClassName('modal-proposta')[0].classList.add('animated')
        document.getElementsByClassName('modal-proposta-main')[0].classList.add('animated')
    });
    $USER_ALVO = user
    if(user){
        cartasUser = getCartsFromUser(user)
        renderCarts(cartasToRender)
        renderUser(user.name)
    }   
}
// openModalProposta()
function closeModalProposta(event,force){
    if(event && event.target.className.includes('modal-proposta') && !force){
        removeModal()
    }
    else if (force){
        removeModal()
    }
}

// openModalProposta()

function renderCarts(cards){
    let list = document.getElementsByClassName('list-cards-user')[0]
    console.log(list)
    if(Array.isArray(cards)){
        CLASS_CARTAS = new listaCartas(cards,true)
        list.innerHTML = CLASS_CARTAS.getRenderCartas
    }
}

function renderUser(name){
    let header = document.getElementsByClassName('header-proposta')[0]
    let inner = /*html*/`
        <p>${name}</p>
    `
    header.innerHTML = inner
}


function proposta(card,alvo){
    console.log("PROPOSTA")
    card.classList.toggle('gray')
    let key = card.getAttribute('key')
    let cart = {id:key,qts:1}
    let tipoCarta = alvo?'cartasAlvo':'cartas'
    if($PROPOSTA[tipoCarta][key]){
        delete $PROPOSTA[tipoCarta][key]
    }else{
        $PROPOSTA[tipoCarta][key] = cart
    }
    console.log($PROPOSTA)
}



function removeModal(){
    document.getElementsByClassName('modal-proposta')[0].classList.remove('animated')
    document.getElementsByClassName('modal-proposta-main')[0]?.classList.remove('animated')
    setTimeout(() => {
        document.getElementsByClassName('modal-proposta')[0].remove()
    }, 225);
}

function CardProposta(card,raridade,min,alvo){
    return /*html*/`
    <div class='card_shadow ${raridade} ${min&&'min'}'>
        <div key=${card.id} class='card ${min&&'min'} gray' image=${card.image} onclick="proposta(this,${alvo})">
           <img src="${$PATH}/assets/images/heroes/${card.image}" alt="" width="auto" height="${min?'100':'140'}px">
           <p>${card.name}</p>
           <span>${iconPowerStatus()}${card.poder}</span>
        </div>
    </div>
    `
}

function renderProposta(userAlvo,userDono){
    let inner = /*html*/`
    <div class="modal-proposta-main animated expand">
        <div class='modal-init-proposta'>
            <div id='userDono' class="inventory-proposta">
                <div class="header-proposta">
                    <p>Inventário</p>
                </div>
                <div class="list-cards-user expand">
                   ${userDono.cartas}
                </div>
            </div>
            <div id='userAlvo' class="inventory-proposta">
                <div class="header-proposta">
                    <p>${userAlvo.nome}</p>
                </div>
                <div class="list-cards-user expand">
                    ${userAlvo.cartas}
                </div>
            </div>
        </div>
        <div class='proposta-navigation'>
            <button onclick="backProposta()">Voltar</button>
            <button onclick="makeProposta()">Fazer Proposta</button>
        </div>
    </div>
    `
    document.getElementsByClassName('modal-proposta')[0].innerHTML = inner
}

function renderLoadingProposta(){
    let inner = /*html*/`
    <div id='load-proposta' class="loading-proposta">Carregando...</div>
    `
    document.getElementById('modal-proposta').insertAdjacentHTML('afterend',inner)
}

function closeLoadProposta(){
    document.getElementById('load-proposta')?.remove()
}

function backProposta(){
    document.getElementsByClassName('modal-proposta')[0].innerHTML = renderModal(true)
    cartasUser = getCartsFromUser($USER_ALVO)
    renderCarts(cartasToRender)
    renderUser($USER_ALVO.name)
}

function makeProposta(){
    let cartas = Object.values($PROPOSTA.cartas)
    let cartasAlvo = Object.values($PROPOSTA.cartasAlvo)
    if(!cartas.length && !cartasAlvo.length){
        console.log("Sem cartas")
        notify("Deve haver ao menos uma carta na negociação !")
        return
    }
    let request = {
        user:$AUTH.login,
        userAlvo:$USER_ALVO.login,
        cartas:cartas,
        cartasAlvo:cartasAlvo
    }
    console.log(request)
    createProposta(request).then(resolve=>{
        if(resolve?.status){
            notify("Proposta realizada com sucesso !")
            closeModalProposta('',true)
        }
        else{
            notify("Não foi possível realizar proposta !")
        }
        console.log(resolve)
    })
    // console.log(request)
}

function startProposta(){
    resetVarProp()
    try{
        renderLoadingProposta()
        getInventory($AUTH.login).then(resolve=>{
            closeLoadProposta()
            console.log(resolve)
            if(!resolve.status) return
            let cartas = resolve.dados

            let alvo = {
                nome: $USER_ALVO.name,
                cartas: getCreateRender(getCartsFromUser($USER_ALVO),true,CardProposta,true)
            }
            let dono = {
                nome: $AUTH.login,
                cartas: getCreateRender(getCartsFromUser({cartas:cartas}),true,CardProposta)
            }
            renderProposta(alvo,dono)
            
        })
    }catch{
        console.error("ERROR em pegar inventario")
    }
    
    // // let inventarioUser = 
    // let alvo = {
    //     nome: $USER_ALVO.name,
    //     cartas: getCreateRender(getCartsFromUser($USER_ALVO),true,CardProposta,true)
    // }
    // let dono = {
    //     nome: $AUTH.login,
    //     cartas: getCreateRender(getCartsFromUser($AUTH),true,CardProposta)
    // }
    // renderProposta(alvo,dono)
}