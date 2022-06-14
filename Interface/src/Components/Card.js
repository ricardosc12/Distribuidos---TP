function Card(card,raridade){
    return /*html*/`
    <div class='card_shadow ${raridade}'>
        <div key=${card.id} class='card' image=${card.image} onclick="clickCard(this)">
           <img src="./assets/images/heroes/${card.image}" alt="" width="auto" height="190px">
        </div>
    </div>

    `
}

function clickCard(card){
    // console.log(card.getAttribute('image'))
    console.log(CLASS_CARTAS.cartaByIndex(card.getAttribute('key')).name)
    
}