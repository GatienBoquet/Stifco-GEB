// Contrôleur index
module.exports = function(app, io){
	app.get('/', function(req, res){
		console.log("ID navigo = " + req.session.idnavigo);
		if(typeof(req.session.idnavigo)  == 'undefined'){
			res.render('index', {idnavigo: '0', prenom: "Inviter"});
		}
		else{
			res.render('index', {idnavigo: req.session.idnavigo, prenom :req.session.prenomuser});
		}
	});
};
