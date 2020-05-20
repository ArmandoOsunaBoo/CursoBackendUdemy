
const session = require('express-session');
const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const app = express();

app.use(express.static(__dirname + '/public'));

 const actionsRoutes = require('./routes/actions_route');
 const registrationRoutes = require('./routes/registrations_route');
 const sessionsRoutes = require('./routes/sessions_routes');

 const findUserMiddleware = require('./middlewares/find_user');
 const authUser = require('./middlewares/authentication_user');
const socketIO = require('socket.io');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set('view engine','pug');

var config ={
  secret: ['sdjhfiheifuaehifawuhfi','aawieunfi234234unisdfjnsdi'],
  saveUninitialized:false,
  resave:false
};

if(process.env.NODE_ENV && process.env.NODE_ENV== 'production'){
   config['store'] = new (require('connect-pg-simple')(session))();
}

app.use(session(config));

app.use(findUserMiddleware);
app.use(authUser);
app.use(actionsRoutes);
app.use(registrationRoutes);
app.use(sessionsRoutes);
//Create Update Read Delete OBject Relational Mapping
app.get('/',function(req,res){
  if(req.user===undefined ||req.user===null ){
    res.redirect('/sessions');
  }else{
    res.render('start',{user: req.user});
  }
});

  let server = app.listen( process.env.PORT || 4040);
let io = socketIO(server);
let usernum=0;
let sockets = {};

io.on('connection',function(socket){

  let userId = socket.request._query.loggeduser;
  if(userId) sockets[userId] = socket;
  console.log(sockets);
  //
  usernum=usernum+1;
  io.emit('count_upd',{count: usernum});

  socket.on('new_action',function(data){
    if(data.userId){
      let userSocket = sockets[data.userId];
      if(!userSocket) return;

      userSocket.emit('new_action',data);
    }
  });

  socket.on('disconnect',function(){
    Object.keys(sockets).forEach(userId=>{
      let s = sockets[userId];
      if(s.id == socket.id) sockets[userId] = null;
    });
    console.log(sockets);
    //
    usernum=usernum-1;
    io.emit('count_upd',{count: usernum});
  });
});


const client = require('./realtime/client');
