var net = require('net');
var readline = require('readline');

var client = new net.Socket();
client.connect(5000, '127.0.0.1', function() {
    console.log('Connected');
});

let received = ""
let bigdata = false

client.on('data', function(data) {
    data = data.toString()
    if(data.includes('$INIT$')){
        bigdata = true
        data = data.replace("$INIT$","")
        received+=data
    }
    else if (data.includes('$EOF$')){
        bigdata = false
        data = data.replace("$EOF$","")
        received+=data
        console.log(JSON.parse(received))
    }
    else if(bigdata){
        received+=data
    }
    else {
        console.log(JSON.parse(data))
    }
});

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput(){
    leitor.question("> ", function(answer) {
        if(answer == 'exit'){
            leitor.close();
        }
        else if(answer == '1'){
            console.log("Criando usuário")
            let request = {
                nome:'Isabella',
                login:'isa',
                password:123,
            }
            request = "$cu$"+JSON.stringify(request)
            client.write(request);
        }
        else if(answer == '2'){
            console.log("Listando usuários")
            request = "$gu$"
            client.write(request);
        } 
        else if (answer == '3'){
            console.log("Add Cartas")
            let request = {
                user:'isa',
                cartas:[
                    {id:'3',qts:'3'},
                    {id:'4',qts:'3'},
                ]
            }
            request = "$ac$"+JSON.stringify(request)
            client.write(request);
        } 
        else if(answer == '4'){
            console.log("Listando Inventario")
            let request = {
                user:'ric',
            }
            request = "$gi$"+JSON.stringify(request)
            client.write(request);
        } 
        else if(answer == '5'){
            console.log("Listando Cartas")
            request = "$gc$"
            client.write(request);
        } 
        else if(answer == '6'){
            console.log("Criando Proposta")
            let request = {
                user:'ric',
                userAlvo:'isa',
                cartas:[
                    {id:'1',qts:'1'},
                    {id:'2',qts:'1'},
                ],
                cartasAlvo:[
                    {id:'3',qts:'1'},
                    {id:'4',qts:'1'},
                ]
            }
            request = "$cp$"+JSON.stringify(request)
            client.write(request);
        } 
        else if(answer == '7'){
            console.log("Listando propostas")
            let request = {
                user:'ric',
            }
            request = "$gp$"+JSON.stringify(request)
            client.write(request);
        }
        else if(answer == '8'){
            console.log("Aceita proposta")
            let request = {
                id:2,
            }
            request = "$ap$"+JSON.stringify(request)
            client.write(request);
        } 
        else if(answer == '9'){
            console.log("Rejeita proposta")
            let request = {
                id:1,
            }
            request = "$rp$"+JSON.stringify(request)
            client.write(request);
        }
        else if(answer == '10'){
            console.log("Logando")
            let request = {
                login:'risc',
                password:123
            }
            request = "$lu$"+JSON.stringify(request)
            client.write(request);
        } 
        else {
            client.write(answer);
        }
        // client.write(answer);
        getInput()
    })
}

getInput()