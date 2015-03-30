module.exports = function(app, io){
        app.get('/ajoutDemande', function(req, res){
		var finalGare;;
		mysqlClient.query('SELECT id, libelle from gare', function (error, rows) {
        		if (error){
           			console.log(error);
            			res.render('ajoutDemande');
        		}
	
	        	else{
				finalGare = rows;
				mysqlClient.query('SELECT distinct(libelle), id from ville order by libelle asc', function(error, rows){
					if(error){
						console.log(error);
						res.render('ajoutDemande');
					}
					else{
	         				res.render('ajoutDemande', { 'gare': finalGare, 'ville': rows });
					}
				});
			}
	    	});

		io.sockets.on('connection', function(socket){	
			socket.on('addOffer', function(offer){
				var week = dtow(offer.date);
				console.log(week);	
				mysqlClient.query('INSERT INTO demande(id_demandeur, id_ville, heure_dep, heure_ret, semaine, complete) values(' + req.session.iduser +', ' + offer.ville + ', ' + offer.heureDep + ', ' + offer.heureRet + ', ' + week + ', 0);', function(error, res){
					if(error)
						console.log(error)
					else
						socket.emit('addOfferDone');
				});
			});
		});
	});
};




		// --	Function   -- //


function dtow(date){
	var d = new Date(date.substring(0, 8));
        var DoW = d.getDay();
        var ms = d.valueOf(); // GMT

        d.setDate(d.getDate() - (DoW + 6) % 7 + 3); // Nearest Thu
        d.setMonth(0);
        d.setDate(4); // Thu in Week 1

        return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
}

