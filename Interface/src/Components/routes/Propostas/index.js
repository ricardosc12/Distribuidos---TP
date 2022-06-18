importCss('./src/Components/routes/Propostas/propostacss.css')

let $PROPOSTAS = {
    "recebidas": [],
    "feitas": [
        {
            "idProposta": 1,
            "cartasDono": [
                {
                    "carta": 3,
                    "qts": 1
                }
            ],
            "cartasAlvo": [
                {
                    "carta": 1,
                    "qts": 1
                }
            ],
            "user": {
                "name": "Isabella",
                "login": "isa"
            },
            "status": "pendente"
        }
    ]
}

function routePropostas(){
    initRoutePropostas()
    return /*html*/`
        <div class="main_propostas">
            <div class="box_proposta">

                <div class="head_proposta">
                    <h3>Propostas Recebidas</h3>
                    <button onclick="expand('recebidas')">Expand</button>
                </div>

                <div id="propostas_recebidas" class="list_propostas list_recebidas">
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                </div>
            </div>
            <div class="box_proposta">

                <div class="head_proposta">
                    <h3>Propostas Feitas</h3>
                    <button onclick="expand('feitas')">Expand</button>
                </div>

                <div id="propostas_feitas" class="list_propostas">
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                    ${renderPropostaItem()}
                </div>
            </div>
        </div>
    `
}

function initRoutePropostas(){
    setTimeout(() => {
        getPropostas($AUTH.login).then(resolve=>{
            console.log(resolve)
        })
    });
}

function expand(list){

    let lista = document.getElementById(`propostas_${list}`)
    lista.classList.toggle(`list_${list}`)
}


function renderPropostaItem(){
    return /*html*/`
        <div class="item_proposta">
            <div class="user_prop">Teste</div>
            <div onclick="openCartasProp()" class="cartas_prop">Cartas</div>
            <div class="choose_prop">
                <button>Aceitar</button>
                <button>Rejeitar</button>
            </div>
        </div>
    `
}

function openCartasProp(){
    openModalCartas()
}