const express = require('express');
        cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const md5 = require('md5');
const connection = require('./bd/mysql.js');
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nameBot = "BotChat";

let routes = require('./app/routes')

let sessionMiddleware = session({
    secret: 'keyUltraSecret',
    resave: true,
    saveUninitialized: true
});

//acomodar
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));
app.set('view engine', 'pug');
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000
        }
    }));

app.use('/',routes);

io.on('connection', (socket) => {
	console.log('Chat conectado...');
	let req = socket.request;
    let { id, username, correo } = req.session;

	  socket.on('chat message', msg => {
	    io.emit('chat message', msg);
	  });

	  socket.on('salaActiva', function(data){
			const idSala = data.idgrupo,
			nombreSala = data.nomgrup;

			if(!req.session.roomName){
				socket.join(req.session.roomName);
				console.log('Bienvenido a la sala: ' + data.nomgrup);
			}else{
				socket.leave(req.session.roomName);
				socket.join(req.session.roomName);
				console.log('Cambio de sala de '+ req.session.roomName +' a: ' + data.nomgrup);
			}

			

			req.session.roomID = idgrupo;
			req.session.roomName = nomgrup;
			
			bottxt('cambioSala');

		})});
        
app.post('/getsal', function(req,res){
    let sql = 'SELECT * FROM grupos';
    connection.query(sql, function(err,resp){
        if(resp.length){
            res.send(resp);
        }else{
            res.send(false);
        }
    });
});

app.post('/addroom',function(req,resp){
    let sql1 = 'INSERT INTO grupos (nomgrup) VALUES("'+req.body.name+'")';
    var idins;
    connection.query(sql1, function(err,resp1){
        if(resp1.insertId){
            console.log(resp.json(resp1))
            //return resp1.insertId;
            //idins = res.insertId;
        }else{
            console.log(err);
        }
    });
});

app.get('/sesion', function(req,res,next){
    res.send(req.session);
});

app.get('/cerrar', function(req,res,next){
    req.session.destroy();
})


app.listen(8080);