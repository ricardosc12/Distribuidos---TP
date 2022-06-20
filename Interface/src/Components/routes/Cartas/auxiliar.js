class listaCartas {
    constructor (CARDS,min) {
        this.cartas = {
            lista:CARDS,
            render:this.getCreateRender(CARDS,min)
        }
        this.debounceFilter = null
    }

    getCreateRender(cartas,min){
        let render = ""
        cartas.forEach((card,index) => {
            let poder = Object.values(card.powerstats).reduce((prev,current)=>prev+current)
            card.poder = poder
            if(poder>=569){
                render+=Card(card,'supreme',min)
            }
            if(poder>=500 && poder<569){
                render+=Card(card,'legendary',min)
            }
            if(poder>=400 && poder<500){
                render+=Card(card,'epic',min)
            }
            if(poder>=250 && poder<400){
                render+=Card(card,'rare',min)
            }
            if(poder<250){
                render+=Card(card,'comun',min)
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

function getCreateRender(cartas,min,func=Card,alvo){
    let render = ""
    cartas.forEach((card,index) => {
        let poder = Object.values(card.powerstats).reduce((prev,current)=>prev+current)
        card.poder = poder
        if(poder>=569){
            render+=func(card,'supreme',min,alvo)
        }
        if(poder>=500 && poder<569){
            render+=func(card,'legendary',min,alvo)
        }
        if(poder>=400 && poder<500){
            render+=func(card,'epic',min,alvo)
        }
        if(poder>=250 && poder<400){
            render+=func(card,'rare',min,alvo)
        }
        if(poder<250){
            render+=func(card,'comun',min,alvo)
        }
    });
    return render
}