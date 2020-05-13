const io = require("socket.io-client");
const socket = io.connect("http://145.24.222.179:8085");

var bankCode = "FLFL";

withdraw = {
    'body': {
        'pin': '0000',
        'account': '01234567',
        'amount': 15.00
    },
    'header': {
        'originCountry': 'DE',
        'originBank': 'ANVI',
        'receiveCountry': 'DE',
        'receiveBank': 'DASB'
    }
}

response = {
    'body': {
        'code': '',
        'message': ''
    },
    'header': {
        'originCountry': 'DE',
        'originBank': 'ANVI',
        'receiveCountry': 'DE',
        'receiveBank': 'DASB'
    }
}

socket.on("connect", function() {
    console.log("connected to server");
    socket.emit("verbonden", bankCode);
    console.log("withdraw versturen naar DASB");
    socket.emit("withdraw", withdraw);

    socket.on("withdraw", function(withdrawBody){
        console.log(withdrawBody);
    })

    socket.on("response", function(responseBody){
        console.log("Response ontvangen: ");
        console.log(responseBody);
    })
});