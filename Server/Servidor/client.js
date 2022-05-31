var net = require('net');
var readline = require('readline');

var client = new net.Socket();
client.connect(5000, '127.0.0.1', function() {
    console.log('Connected');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    client.destroy();
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
        client.write(answer);
        getInput()
    })
}

getInput()