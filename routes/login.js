// Contrôleur login 
module.exports = function(app, io){
	app.get('/login', function(req, res){
		if(typeof(req.session.idnavigo)  == 'undefined'){
			res.render('login');
			io.sockets.on('connection', function(socket){
				socket.on('login', function(login){
					console.log("LOGIN WORK IN PROGRESS");
					var IDnavigo = login.idnavigo;
					var password = login.mdp;
					mysqlClient.query("SELECT numCarteNavigo,motDePasse,id,nom,prenom FROM utilisateur WHERE numCarteNavigo='" + IDnavigo + "' AND motDePasse='" + password + "';",function(error, rows, res){
						if(error){
							console.log(error);
							socket.emit('Error');
						}
						else if(rows.length <= 0){
							console.log("Mauvais login ou mot de passe");
							socket.emit('Error');
						}
						else
						{
							console.log("pas d'erreur");
							req.session.idnavigo = IDnavigo;
							req.session.iduser = rows[0].id;
							req.session.nomuser = rows[0].nom;
							req.session.prenomuser = rows[0].prenom;
							req.session.save();
							console.log("Session OK");
							console.log("Tu es l'id navigo = " + req.session.idnavigo);
							console.log("ID user : " + req.session.iduser);
							//fonctionne pas
							socket.emit('good');
						}
						
					});
				});
			});
	}else{
		res.redirect('../');
	}
	});
};
