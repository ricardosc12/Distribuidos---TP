function Card(card,raridade,min){
    return /*html*/`
    <div class='card_shadow ${raridade} ${min&&'min'}'>
        <div key=${card.id} class='card ${min&&'min'}' image=${card.image} onclick="clickCard(this,${!min})">
           <img src="${$PATH}/assets/images/heroes/${card.image}" alt="" width="auto" height="${min?'100':'140'}px">
           <p>${card.name}</p>
           <span>${iconPowerStatus()}${card.poder}</span>
        </div>
    </div>

    `
}

function clickCard(card,openModal){
    console.log(card.getAttribute('image'))
    // console.log(CLASS_CARTAS.cartaByIndex(card.getAttribute('key')).name)
    openModal&&openModalProposta()
    
}