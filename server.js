var http = require('http');
var express = require('express');
var ent = require('ent');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mysql = require('mysql');
var fs = require('fs');

var app = express();

mysqlClient = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mission4'
});

app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	  secret: 'stifcoGEB',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: true }
}))

/*
	--- MISSION 4 : StifCo -----
		-- AUTEURS --
	
	-Gatien Boquet
    -Bastien Le Bret

		-- RAPPEL --
	- :8080 = DEV
	- :80 = PROD

		-- TO DO --
	
	-.show .hide() c'est mieux
*/
var server = app.listen(8080);

var io = require('socket.io').listen(server);
//app.get('/', function(res, req){



//.get('/inscription', user.inscription)

//user.login - dans un objet
app.use(express.static('views/'));
app.get('/login', function(req, res){
	res.render('login.ejs');
})

app.get('/inscription', function(req, res){
	res.render('inscription.ejs');
});

app.post('/ajoutDemande', function (req, res) {
    mysqlClient.query('SELECT libelle from gare', function (error, resQuery) {
        if (error)
            console.log(error);
        else
            res.render('crudOffer.ejs', { 'req': resQuery });
    });
});

//Foutre dans un objet
app.post('/login', function(req, res){
		
	
		var IDnavigo = req.body.navigo;
		var password = req.body.password;
		var regex = /[1-9]/g;
		
		//8 chiffres !!
		if(IDnavigo != null && IDnavigo.match(regex)){
			io.sockets.emit('navigoBon');
		}else{
			io.sockets.emit('navigoMauvais');
		}
		
		if(password.length > 1){		
			io.sockets.emit('passbon');
		}else{
			io.sockets.emit('passdiff',"message");
		}
		
		//SQL DANS LA DB
		mysqlClient.query("SELECT Ncarte,password FROM utilisateurs WHERE Ncarte='" + IDnavigo + "' AND password='" + password + "';",function(error,res){
			if(error){
				console.log(error);
				io.sockets.emit("Error");
			}else{
				var sess = req.session;
				//i
				sess.id = IDnavigo;
			}			
			console.log("Bonjour " + sess.id);
		});
		
		
		//    -- DEBUG -- 
		console.log(req.body.navigo);
		console.log(req.body.password);


	});
	
	
//.get('/ajout', user.add)

//.get('/offre', user.getOffre)

//.get('/modificiation', user.modifOffre)



//TODO

//.get('/profile', user.getProfile)

//.get('/reserver', user.reserver)

//.get('/reservation', user.getReservation)



