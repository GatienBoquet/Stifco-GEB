	// Modules //
var http = require('http');
var express = require('express');
var mysql = require('mysql');


var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

require('./routes')(app, io);
require('./routes/login');
require('./routes/demande')(app, io);
require('./routes/offre');


// -- Configuration --
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

mysqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'bastos',
    password: 'atb9bjs3',
    port: 3306,
    database: 'mission4'
});
// -- Fin Configuration --


//app.get('/', routeIndex.index);
//app.get('/login', user.login);
//app.get('/inscription', user.inscription);
//app.get('/ajoutDemande', demande.ajoutDemande);
//app.get('/demande', demande.crud);
//app.get('/ajoutOffre', offre.ajoutOffre);
//app.get('/offre', offre.crud);



module.exports = app;
