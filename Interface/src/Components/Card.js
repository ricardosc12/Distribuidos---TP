function Card(card,raridade,min){
    return /*html*/`
    <div class='card_shadow ${raridade} ${min&&'min'}'>
        <div key=${card.id} class='card ${min&&'min'}' image=${card.image} onclick="clickCard(this,${!min})">
           <img src="./assets/images/heroes/${card.image}" alt="" width="auto" height="190px">
        </div>
    </div>

    `
}

function clickCard(card,openModal){
    // console.log(card.getAttribute('image'))
    // console.log(CLASS_CARTAS.cartaByIndex(card.getAttribute('key')).name)
    openModal&&openModalProposta()
    
}