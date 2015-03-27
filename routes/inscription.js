module.exports = function(app, io){
	app.get('/inscription', function(req, res){
		res.render('inscription');
	});
};
