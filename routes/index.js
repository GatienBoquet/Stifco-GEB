// Contr�leur index
module.exports = function(app, io){
	app.get('/', function(req, res){
		res.render('index');
	});
};
