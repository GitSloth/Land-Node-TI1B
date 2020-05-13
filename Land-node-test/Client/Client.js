const io = require("socket.io-client");
const socket = io.connect("http://localhost:8000");

var bankCode = "DASB";

withdraw = {
    'body': {
        'pin': '0000',
        'account': '01234567',
        'amount': 15.00
    },
    'header': {
        'originCountry': 'NL',
        'originBank': 'INGB',
        'receiveCountry': 'DE',
        'receiveBank': 'DASB'
    }
}

socket.on("connect", function() {
    console.log("connected to server");
    socket.emit("verbonden", bankCode);
    socket.emit("withdraw", withdraw);

    socket.on("withdraw", function(withdrawBody){
        console.log(withdrawBody);
    })


});