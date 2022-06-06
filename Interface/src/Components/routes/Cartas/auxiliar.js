class listaCartas {
    constructor (CARDS) {
        this.cartas = {
            lista:CARDS,
            render:this.getCreateRender(CARDS)
        }
        this.debounceFilter = null
    }

    getCreateRender(cartas){
        let render = ""
        cartas.forEach((card,index) => {
            let poder = card.poder_total
            if(poder>=569){
                render+=Card(card,'supreme')
            }
            if(poder>=500 && poder<569){
                render+=Card(card,'legendary')
            }
            if(poder>=400 && poder<500){
                render+=Card(card,'epic')
            }
            if(poder>=250 && poder<400){
                render+=Card(card,'rare')
            }
            if(poder<250){
                render+=Card(card,'comun')
            }
        });
        return render
    }

    get getRenderCartas(){
        return this.cartas.render
    }

    filterByName(value,target){
        clearTimeout(this.debounceFilter)
        this.debounceFilter = setTimeout(()=>{
            let name = value.toLowerCase()
            let data = this.cartas.lista.filter(carta=>carta.name.toLowerCase().includes(name))
            target.innerHTML = this.getCreateRender(data)
        },100)
    }

    cartaByIndex(id){
        return this.cartas.lista.filter(item=>item.id == id)[0]
    }
}