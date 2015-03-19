// Contrôleur index
exports.index = function(req, res){
	res.render('index');
};

exports.login = function(req, res){
	res.render('login');
};

exports.inscription = function(req, res){
	res.render('inscription');
};

exports.postlogin = function(req, res){
	
	var IDnavigo = req.body.navigo;
	var password = req.body.password;
	var regex = /[1-9]/g;
		
	//  -- IDnavigo doit être non null et avoir 8 chiffres . --  
	if(IDnavigo != null && IDnavigo.match(regex)){
		io.sockets.emit('navigoBon');
	}else{
		io.sockets.emit('navigoMauvais');
	}
	
	if(password.length > 1){		
		io.sockets.emit('passbon');
	}else{
		io.sockets.emit('passdiff',"message");
	}

	
	mysqlClient.query("SELECT Ncarte,password FROM utilisateurs WHERE Ncarte='" + IDnavigo + "' AND password='" + password + "';",function(error,res){
		if(error){
			console.log(error);
			io.sockets.emit("Error");
		}else{
			//Ouverture d'une session -- WIP
			var sess = req.session;
			sess.id = IDnavigo;
		}			
		console.log("Bonjour " + sess.id);
	});
	
	
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

