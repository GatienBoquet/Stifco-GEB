module.exports = function(app, io){
	app.get('/offre', function(req, res){
		res.render('offre');
	});
};
