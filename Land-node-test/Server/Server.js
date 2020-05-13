var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var DASB;
var ANVI;
var REBK;
var FLFL;

var DASBingelogd;
var ANVIingelogd;
var REBKingelogd;
var FLFLingelogd;

var ipDASB = "83.86.190.206";
var ipANVI = "";
var ipREBK = "";
var ipFLFL = "77.160.100.85";

io.on("connection", (socket) => {
    console.info(`Client connected id=`, socket.id, ' ip:', socket.handshake.address.slice(7,20));
    if (socket.handshake.address.slice(7,20) == ipDASB){
        DASB = socket.id;
        socket.join('DASB');
        console.log("DASB: ", socket.id);
        console.log(io.sockets.adapter.rooms['DASB'].length);
    }
    else if (socket.handshake.address.slice(7,20) == ipANVI){
        ANVI = socket.id;
        socket.join('ANVI');
        console.log("ANVI: ", socket.id);
    }
    else if (socket.handshake.address.slice(7,20) == ipREBK){
        REBK = socket.id;
        socket.join('REBK');
        console.log("REBK: ", socket.id);
    }
    else if (socket.handshake.address.slice(7,20) == ipFLFL){
        FLFL = socket.id;
        socket.join('FLFL');
        console.log("FLFL: ", socket.id);
    }
    else {
        socket.disconnect(true);
    }

    socket.on("disconnect", () => {
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("withdraw", function(withdrawBody){
        const { receiveBank } = withdrawBody.header; 
        console.log("Withdraw ontvangen. receiveBank: ", receiveBank);  
        if(receiveBank == 'DASB'){
            io.to('DASB').emit('withdraw', withdrawBody);
        }   
        else if(receiveBank == 'ANVI'){
            io.to('ANVI').emit('withdraw', withdrawBody);
        }
        else if(receiveBank == 'REBK'){
            io.to('REBK').emit('withdraw', withdrawBody);
        }
        else if(receiveBank == 'FLFL'){
            io.to('FLFL').emit('withdraw', withdrawBody);
        }
    });

    socket.on('response', responseBody => {
        const { receiveBank } = responseBody.header;
        console.log("Response ontvangen. receiveBank: ", receiveBank);
        if(receiveBank == 'DASB'){
            io.to(DASB).emit('response', responseBody);
        }   
        else if(receiveBank == 'ANVI'){
            io.to(ANVI).emit('response', responseBody);
        }
        else if(receiveBank == 'REBK'){
            io.to(REBK).emit('response', responseBody);
        }
        else if(receiveBank == 'FLFL'){
            io.to(FLFL).emit('response', responseBody);
        }
    })

    socket.on("balance", balanceBody => {
        const { receiveBank } = balance.header; 
        console.log("Withdraw ontvangen. receiveBank: ", receiveBank);  
        if(receiveBank == 'DASB'){
            io.to('DASB').emit('balance', balanceBody);
        }   
        else if(receiveBank == 'ANVI'){
            io.to('ANVI').emit('balance', balanceBody);
        }
        else if(receiveBank == 'REBK'){
            io.to('REBK').emit('balance', balanceBody);
        }
        else if(receiveBank == 'FLFL'){
            io.to('FLFL').emit('balance', balanceBody);
        }
    })
});

http.listen(8085, function(){
    console.log('listening on : 8085');
  });