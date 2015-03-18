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
                        host: '127.0.0.1',
                        user: 'root',
                        password: '',
                        port: 3306,
                        database: 'mission4'
                });

	while(typeof json[i] != 'undefined'){
		
		var libelle = json[i].fields.libelle;
		libelle = libelle.replace("'", "\\'");
		var code_uic = json[i].fields.code_uic;
		var zone_navigo = json[i].fields.zone_navigo;
		var coordinates = json[i].geometry.coordinates[0] + ',' + json[i].geometry.coordinates[1];

		i++;
		
		mysqlClient.query("insert into gare(libelle, code_uic, zone_navigo, coordonnees) values('" + libelle + "', '" + code_uic + "', " + zone_navigo + ", '" + coordinates + "');", function(error, res){
		if(error)
			console.log(error);
		});
	}
	mysqlClient.end();
}