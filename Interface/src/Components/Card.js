function Card(card,raridade){
    return /*html*/`
    <div class='card_shadow ${raridade}'>
        <div class='card' image=${card.images} onclick="clickCard(this)">
           <img src="../Server/CompressImages/${card.images}" alt="" width="auto" height="190px">
        </div>
    </div>

    `
}

function clickCard(card){
    console.log(card.getAttribute('image'))
}