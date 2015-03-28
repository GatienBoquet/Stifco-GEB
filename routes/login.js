// Contrôleur login 
module.exports = function(app, io){
	app.get('/login', function(req, res){
		res.render('login');
		io.sockets.on('connection', function(socket){
			socket.on('login', function(login){
				console.log("LOGIN WORK IN PROGRESS");
				var IDnavigo = login.idnavigo;
				var password = login.mdp;
				mysqlClient.query("SELECT numCarteNavigo,motDePasse,id,nom,prenom FROM utitlisateur WHERE numCarteNavigo='" + IDnavigo + "' AND motDePasse='" + password + "';",function(error, rows, res){
					if(error){
						console.log("Mauvais password ou login");
						console.log("Login : " + IDnavigo);
						console.log("Password : " + password);
					}else{
						req.session.idnavigo = IDnavigo;
						req.session.iduser = rows[0].id;
						req.session.nomuser = rows[0].nom;
						req.session.prenomuser = rows[0].prenom;
						req.session.save();
						console.log("Session OK");
						console.log("Tu es l'id navigo = " + req.session.idnavigo);
						console.log("ID user : " + req.session.iduser);
					}
				});
				console.log("REDIRECTION NOW");
				res.redirect('/boo');
			});
		});
	});
};