// -- Modules --

var http = require('http');
var express = require('express');
var ent = require('ent');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var fs = require('fs');
var routes = require('./routes');
var app = express();

// -- Fin Modules --



// -- Configuration --
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	  secret: 'stifcoGEB',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: true }
}))
mysqlClient = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mission4'
});
// -- Fin Configuration --




// -- Routes --
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/inscription', routes.inscription);

app.post('/login', routes.postlogin);
app.get('/ajoutDemande', routes.ajoutDemande);


// -- Fin Routes --



// -- 8080 = DEV || 80 = PROD  --
app.listen(8080);
