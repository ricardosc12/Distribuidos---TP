importCss('./src/Components/routes/Modal/CartasProposta/cartasproposta.css')

function modalCartasProposta(){
    return /*html*/`
        <div class="cartas_modal" onclick="closeModalCartas(event)">
            <div class="main_modal_cartas">
                <div class="box_area">
                    <div class="head_modal"></div>
                    <div class="list_modal"></div>
                </div>
                <div class="box_area">
                    <div class="head_modal"></div>
                    <div class="list_modal"></div>
                </div>
            </div>
        </div>
    `
}

function openModalCartas(){
    console.log($PROPOSTAS)
    getClass('app').insertAdjacentHTML('afterend',modalCartasProposta())
    // mainToModal.innerHTML = mainToModal.innerHTML+modalUser()
    setTimeout(() => {
        document.getElementsByClassName('cartas_modal')[0].classList.add('animated')
        document.getElementsByClassName('main_modal_cartas')[0].classList.add('animated')
    });
}
openModalCartas()
function closeModalCartas(event,force){
    if(event && event.target.className.includes('cartas_modal') && !force){
        removeModal()
    }
    else if (force){
        removeModal()
    }
}

function removeModal(){
    document.getElementsByClassName('cartas_modal')[0].classList.remove('animated')
    document.getElementsByClassName('main_modal_cartas')[0]?.classList.remove('animated')
    setTimeout(() => {
        document.getElementsByClassName('cartas_modal')[0].remove()
    }, 225);
}
