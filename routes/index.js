// Contrôleur index
module.exports = function(app, io){
	app.get('/', function(req, res){
		console.log(req.session.idnavigo);
		if(req.session.idnavigo  == 'undefined'){
			res.render('index', {idnavigo: "0"});
		}
		else{
			res.render('index', {idnavigo: req.session.idnavigo});
		}
	});
};
