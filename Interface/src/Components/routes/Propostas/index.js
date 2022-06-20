importCss('./src/Components/routes/Propostas/propostacss.css')

let $PROPOSTAS = null

function routePropostas(){
    initRoutePropostas()
    return /*html*/`
        <div class="main_propostas">
            <div class="box_proposta">

                <div class="head_proposta">
                    <h4>Propostas Recebidas</h4>
                    <!-- <button onclick="expand('recebidas')">Expand</button> -->
                </div>

                <div id="propostas_recebidas" class="list_propostas list_recebidas">
                </div>
            </div>
            <div class="box_proposta">
                <div class="head_proposta">
                    <h4>Propostas Feitas</h4>
                    <!-- <button onclick="expand('feitas')">Expand</button> -->
                </div>
                <div id="propostas_feitas" class="list_propostas list_feitas">
                </div>
            </div>
        </div>
    `
}

function initRoutePropostas(){
    setTimeout(() => {
        getPropostas($AUTH.login).then(resolve=>{
            if(resolve?.status){
                $PROPOSTAS = resolve.dados
                renderItemsPropostas($PROPOSTAS.feitas,'propostas_feitas')
                renderItemsPropostas($PROPOSTAS.recebidas,'propostas_recebidas')
            }
            else{
                console.error("Falha em obter propostas")
            }
        })
        // console.log($PROPOSTAS)
        // renderItemsPropostas($PROPOSTAS.feitas,'propostas_feitas')
        // renderItemsPropostas($PROPOSTAS.recebidas,'propostas_recebidas')
    });
}

function expand(list){
    return
    let lista = document.getElementById(`propostas_${list}`)
    lista.classList.toggle(`list_${list}`)
}

function renderItemsPropostas(list,tg){
    let inner = ''
    list.forEach(item => {
        inner=renderPropostaItem(item.user.name,tg,item.idProposta,item.status)+inner
    });
    getId(tg).innerHTML = inner
}

function renderPropostaItem(name,tg,id,status){
    let tipo = (tg=='propostas_feitas')?'feitas':'recebidas'
    return /*html*/`
        <div class="item_proposta">
            <div class="user_prop">
                <div>${id}</div>
                <p>${name}</p>
            </div>
            <div onclick="openCartasProp('${tipo}','${id}')" class="cartas_prop">
                <img width="17px" height="17px" src="${$PATH}/assets/images/card.png" alt="">
            </div>
            <div id="choose_prop_${id}" class="choose_prop">
                ${typeChooseProp(tipo,status,id)}
            </div>
        </div>
    `
}

function confirmProp(status,id){
    confirmProposta(status,id).then(resolve=>{
        if(resolve?.status){
            getId(`choose_prop_${id}`).innerHTML = `<div class="statusprop ${status?"aceita":"rejeitada"}">${status?"Aceita":"Rejeitada"}</div>`
        }
        else if(resolve?.mensagem.includes('possuem mais as cartas')){
            getClass(`choose_prop_${id}`).innerHTML = `<div class="statusprop rejeitada">Rejeitada</div>`
            notify(resolve.mensagem)
        }
        else{
            notify(resolve.mensagem)
        }
        console.log(resolve)
    })
}

function typeChooseProp(tipo,status,id){
    if(tipo == "recebidas" && status=="pendente"){
        return /*html*/`
            <button id="acceppt" onclick="confirmProp(true,${id})">Aceitar</button>
            <button id="reject" onclick="confirmProp(false,${id})">Rejeitar</button>
        `
    }
    return /*html*/`
        <div class="statusprop ${status}">${firstLetterUp(status)}</div>
    `
}

function openCartasProp(tipo,id){
    let prop = $PROPOSTAS[tipo].filter(item=>item.idProposta==id)[0]
    openModalCartas(prop,tipo)
}