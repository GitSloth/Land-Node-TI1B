const io = require("socket.io-client");
const socket = io.connect("http://145.24.222.179:8085");

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

response = {
    'body': {
        'code': '',
        'message': ''
    },
    'header': {
        'originCountry': 'DE',
        'originBank': 'DASB',
        'receiveCountry': '',
        'receiveBank': ''
    }
}

socket.on("connect", function() {
    console.log("connected to server");
    socket.emit("withdraw", withdraw);

    socket.on("disconnect", () => {
        console.info(`Disconnected`);
    });

    socket.on("withdraw", function(withdrawBody){
        console.log("Withdraw ontvangen:")
        console.log(withdrawBody);
        response.header.receiveBank = withdrawBody.header.originBank;
        response.header.receiveCountry = withdrawBody.header.originCountry;
        response.header.action = "withdraw";
        response.body.code = 200;
        response.body.message = "Withdraw gelukt!";
        console.log("response versturen...");
        socket.emit("response", response);
    })


});