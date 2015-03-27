// Contrôleur login 
module.exports = function(app, io){
	app.get('/login', function(req, res){
		res.render('login');
		io.sockets.on('connection', function(socket){
			socket.on('login', function(login){
				
				console.log(login);
				
				var IDnavigo = login.idnavigo;
				var password = login.mdp;
				mysqlClient.query("SELECT numCarteNavigo,motDePasse FROM utitlisateur WHERE numCarteNavigo='" + IDnavigo + "' AND motDePasse='" + password + "';",function(error,res){
					if(error){
						console.log("nope");
						console.log("Login : " + IDnavigo);
						console.log("Password : " + password);
					}else{
						req.session.id  = login.idnavigo;
						console.log("nice");
					
					}
				
				
				});
				
				
			});
		});
	});
};