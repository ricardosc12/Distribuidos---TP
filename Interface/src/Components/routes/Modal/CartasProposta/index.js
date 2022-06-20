importCss('./src/Components/routes/Modal/CartasProposta/cartasproposta.css')

function modalCartasProposta(){
    return /*html*/`
        <div class="cartas_modal" onclick="closeModalCartas(event)">
            <div class="main_modal_cartas">
                <div class="box_area">
                    <div class="head_modal">
                        ${iconBack()}
                        <p>Minhas Cartas</p>
                    </div>
                    <div id="cartas_dono_propostas" class="list_modal"></div>
                </div>
                <div class="divisor"></div>
                <div class="box_area">
                    <div class="head_modal">
                        ${iconBack()}
                        <p id="user_alvo_propostas"></p>
                    </div>
                    <div id="cartas_alvo_propostas" class="list_modal"></div>
                </div>
            </div>
        </div>
    `
}
function renderModalCartas(props,tipo){
    if(tipo == 'recebidas'){
        renderInList(props.cartas,'cartas_alvo_propostas')
        renderInList(props.cartasAlvo,'cartas_dono_propostas')
    }
    else{
        renderInList(props.cartas,'cartas_dono_propostas')
        renderInList(props.cartasAlvo,'cartas_alvo_propostas')
    }
    getId('user_alvo_propostas').innerHTML = props.usuarioAlvo
}

function renderInList(cards,id){
    let list = document.getElementById(id)
    list.innerHTML = cards
}

function openModalCartas(prop,tipo){
    if(!prop) return
    getClass('app').insertAdjacentHTML('afterend',modalCartasProposta())
    // mainToModal.innerHTML = mainToModal.innerHTML+modalUser()
    setTimeout(() => {
        document.getElementsByClassName('cartas_modal')[0].classList.add('animated')
        document.getElementsByClassName('main_modal_cartas')[0].classList.add('animated')
    });
    let renderProps = {
        cartas: getCreateRender(getCartsFromUser({cartas:prop.cartasDono}),true),
        cartasAlvo: getCreateRender(getCartsFromUser({cartas:prop.cartasAlvo}),true),
        usuarioAlvo:prop.user.name
    }
    renderModalCartas(renderProps,tipo)

}
// openModalCartas('asd')
function closeModalCartas(event,force){
    if(event && event.target.className.includes('cartas_modal') && !force){
        removeModalCartas()
    }
    else if (force){
        removeModalCartas()
    }
}

function removeModalCartas(){
    document.getElementsByClassName('cartas_modal')[0].classList.remove('animated')
    document.getElementsByClassName('main_modal_cartas')[0]?.classList.remove('animated')
    setTimeout(() => {
        document.getElementsByClassName('cartas_modal')[0].remove()
    }, 225);
}

