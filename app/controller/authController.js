const konfigurasi =  require('../konfigurasi/konfigurasi.js');
const db = require('../konfigurasi/db.konfigurasi.js');

const Aturan = db.aturan;
const Pengguna = db.pengguna;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.registrasi = (req, res) => {
    console.log('Proses registrasi pengguna'  + req.body.nama);

    Pengguna.create({
        nama            : req.body.nama,
        namaPengguna    : req.body.namapengguna,
        email           : req.body.email,
        password        : bcrypt.hashSync(req.body.password, 8),
        createdAt       : new Date(),
        status          : "ACTIVE",
        registrasi      : req.body.registrasi
    }).then(pengguna => {
        Aturan.findAll({
            where : {
                nama : {
                    [Op.or]: ["ADMIN"]
                }
            }
        }).then(aturans => {
            pengguna.setAturans(aturans).then(() => {
                res.send("Registrasi Pengguna Sukses!");
            })
        }).catch(err => {
			res.status(500).send("Error Saat Registrasi " + err);
		});
    }).catch(err => {
		res.status(500).send("Gagal Registrasi! Error Saat Rgistrasi " + err);
	})
}

exports.masuk = (req, res) => {
	console.log("Proses Login / masuk aplikasi");
	
	Pengguna.findOne({
		where: {
			namaPengguna: req.body.namapengguna
		}
	}).then(pengguna => {
		if (!pengguna) {
			return res.status(404).send('Data Pengguna Tidak Ditemukan.');
		}
 
		var validPassword = bcrypt.compareSync(req.body.password, pengguna.password);
		if (!validPassword) {
			return res.status(401).send({ auth: false, aksesToke: null, alasan: "Password Tidak Valid !" });
		}
		
		var token = jwt.sign({ id: pengguna.id }, konfigurasi.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, aksesToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}
