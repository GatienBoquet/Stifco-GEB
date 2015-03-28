// Contrôleur login 
module.exports = function(app, io){
	app.get('/login', function(req, res){
		res.render('login');
		io.sockets.on('connection', function(socket){
			socket.on('login', function(login){
				console.log("LOGIN WORK IN PROGRESS");
				var IDnavigo = login.idnavigo;
				var password = login.mdp;
				mysqlClient.query("SELECT numCarteNavigo,motDePasse FROM utitlisateur WHERE numCarteNavigo='" + IDnavigo + "' AND motDePasse='" + password + "';",function(error,res){
					if(error){
						console.log("Mauvais password ou login");
						console.log("Login : " + IDnavigo);
						console.log("Password : " + password);
					}else{
						req.session.idnavigo = IDnavigo;
						req.session.save();
						console.log("You're now logged in.");
						console.log(req.session.idnavigo);
					
					}
				
				
				});
			});
		});
	});
};