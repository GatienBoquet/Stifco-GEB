// Contrôleur index
module.exports = function(app, io){
	app.get('/', function(req, res){
		res.render('index');
	});
<<<<<<< HEAD
};
=======
	
	
	//    -- DEBUG -- 
	console.log(req.body.navigo);
	console.log(req.body.password);
	//    -- FIN DEBUG --
	
};



exports.addinscription = function(req, res){
	res.render('index');
	
};



exports.ajoutDemande = function(req, res){
 mysqlClient.query('SELECT libelle from gare', function (error, rows) {
        if (error){
	   console.log(error);
	    res.render('ajoutDemande');
	}
        else
            res.render('ajoutDemande', { 'req': rows });
    });
};


exports.getOffres = function(req, res){
    mysqlClient.query("SELECT * FROM offres", function(error, rows){
        if(error){
			console.log(error);
			res.render('offre');
		}
		else{
		    console.log(rows);
			res.render('offre', {'offres': rows});
		}
	});
};

>>>>>>> origin/master
