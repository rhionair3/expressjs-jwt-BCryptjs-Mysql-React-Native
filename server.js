var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./app/router/router.js')(app);
 
const db = require('./app/konfigurasi/db.konfigurasi.js');
 
const Aturan = db.aturan;
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('sinkronisasi data { force: true }');
  inisialisasi();
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})
 
 
function inisialisasi(){
	Aturan.create({
		id: 1,
		nama: "UMUM"
	});
	
	Aturan.create({
		id: 2,
		nama: "ADMIN"
	});
	
	Aturan.create({
		id: 3,
		nama: "PM"
	});
}