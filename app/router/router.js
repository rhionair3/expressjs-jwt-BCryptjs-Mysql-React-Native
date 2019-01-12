const verifikasiRegistrasi = require('./verifikasiRegistrasi.js');
const authJwt = require('./verifikasiToken.js');
 
module.exports = function(app) {
 
    const authC = require('../controller/authController.js');
    const penggunaC = require('../controller/penggunaController.js');
    const kustomerC = require('../controller/kustomerserverController.js');
 
	app.post('/api/auth/registrasi', [verifikasiRegistrasi.cekDuplikatNamaEmail], authC.registrasi);
	
	app.post('/api/auth/masuk', authC.masuk);
	
	app.get('/api/kustomer/pengguna/profil-pengguna', [authJwt.verifikasiToken], penggunaC.profilPengguna);

	app.get('/api/kustomer/pengguna/list-pengguna', [authJwt.verifikasiToken], penggunaC.listPengguna);
	
	app.get('/api/kustomer/kustomer/profil-kustomer', [authJwt.verifikasiToken, authJwt.lvlPM], kustomerC.detailKustomer);

	app.get('/api/kustomer/kustomer/list-kustomer', [authJwt.verifikasiToken, authJwt.lvlPM], kustomerC.listKustomer);
	
	app.get('/api/kustomer/kustomer/tambah-kustomer', [authJwt.verifikasiToken, authJwt.lvlAdmin], kustomerC.tambahKustomer);

	app.get('/api/kustomer/kustomer/edit-kustomer', [authJwt.verifikasiToken, authJwt.lvlAdmin], kustomerC.editKustomer);

	app.get('/api/kustomer/kustomer/hapus-kustomer', [authJwt.verifikasiToken, authJwt.lvlAdmin], kustomerC.hapusKustomer);
	
	app.get('/api/kustomer/kustomerserver/list-server', [authJwt.verifikasiToken, authJwt.lvlPM], kustomerC.listServer);
	
	app.get('/api/kustomer/kustomerserver/detail-server', [authJwt.verifikasiToken, authJwt.lvlPM], kustomerC.detailServer);
	
	app.get('/api/kustomer/kustomerserver/tambah-server', [authJwt.verifikasiToken, authJwt.lvlAdmin], kustomerC.tambahServer);
	
	app.get('/api/kustomer/kustomerserver/edit-server', [authJwt.verifikasiToken, authJwt.lvlAdmin], kustomerC.editServer);
	
	app.get('/api/kustomer/kustomerserver/hapus-server', [authJwt.verifikasiToken, authJwt.lvlAdmin], kustomerC.hapusServer);
}