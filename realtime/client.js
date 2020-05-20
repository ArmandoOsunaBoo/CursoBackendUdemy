const io = require('socket.io-client');
let host ='http://localhost:4040';
if(process.env.NODE_ENV && process.env.NODE_ENV== 'production'){
  host="https://infinite-lowlands-66176.herokuapp.com/";
}


let socket = io.connect(host,{reconnect:true});
socket.on('connect',function(){
  console.log("El servidor se conecto como cliente");
});

module.exports= socket;
