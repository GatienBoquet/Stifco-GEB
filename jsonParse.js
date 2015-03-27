mysql = require('mysql');
var fs = require('fs');

var json = fs.readFile('./gare.json', 'utf8', function(error, data){
	if(error){
		console.log('Error : ' + error);
		return;
	};
	parseAndStore(JSON.parse(data));
});


function parseAndStore(json){

	var i = 0;
	
	var mysqlClient = mysql.createConnection({
	    host: 'localhost',
	    password: 'atb9bjs3',
	    port: 3306,
	    database: 'mission4'
	});

	json.forEach(function(e){
		
		var libelle = e.fields.libelle;
		libelle = libelle.replace("'", "\\'");
		var code_uic = e.fields.code_uic;
		var zone_navigo = e.fields.zone_navigo;
		var latitude = e.geometry.coordinates[0];
		var longitude = e.geometry.coordinates[1];
		var ville = e.fields.commune;
		var codePostal = e.fields.code_insee_commune;
		
		mysqlClient.query("INSERT INTO Ville(libelle, codePostal) VALUE(\"" + ville + "\", '" + codePostal + "');", function(err, res){
		    if(!err || err.errno === 1062){
		        mysqlClient.query("SELECT id FROM Ville WHERE libelle = \"" + ville + "\";", function(err, row){
		            if(err){
		                console.log("\nselect id...");
		                console.log(err);
		            }
		            else{
		                var villeId = row[0].id;
		                mysqlClient.query("INSERT INTO Gare(libelle, code_uic, zoneNavigo, latitude, longitude, id_ville) VALUES('" + libelle + "', '" + code_uic + "', " + zone_navigo + ", " + latitude + ", " + longitude + ", " + villeId +");",
		                    function(error, res){
		                        if(error){
		                            console.log("\ninsert gare...");
			                        console.log(error);
			                    }
		                    });
	                }
		        });
		    }
		    else if(err){
		        console.log("\ninsert ville...");
		        console.log(err);
		    }
		});
		    
    });
}

