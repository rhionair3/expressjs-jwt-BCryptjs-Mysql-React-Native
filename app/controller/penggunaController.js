const konfigurasi =  require('../konfigurasi/konfigurasi.js');
const db = require('../konfigurasi/db.konfigurasi.js');

const Aturan = db.aturan;
const Pengguna = db.pengguna;

const Op = db.Sequelize.Op;

exports.profilPengguna = (req, res) => {
    Pengguna.findOne({
        where   : { id : req.id },
        attributes : ['nama', 'namapengguna', 'email'],
        include : [{
            model : Aturan,
            attributes : ['id', 'nama'],
            through : {
                attributes : ['idPengguna', 'idAturan']
            }
        }]
    }).then(pengguna => {
		res.status(200).json({
			"deskripsi": "Profil Pengguna",
			"pengguna": pengguna
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Tidak Dapat Mengakses Halaman Profil",
			"error": err
		});
	})
}

exports.listPengguna = (req, res) => {
    Pengguna.findAll({
        attributes : ['nama', 'namapengguna', 'email'],
        include : [{
            model : Aturan,
            attributes : ['id', 'nama'],
            through : {
                attributes : ['idPengguna', 'idAturan']
            }
        }]
    }).then(penggunas => {
		res.status(200).json({
			"deskripsi": "List Pengguna",
			"pengguna": penggunas
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Tidak Dapat Menampilkan List Pengguna",
			"error": err
		});
	})
}

exports.editPengguna = (req, res) => {
    console.log('Proses registrasi pengguna');

    Pengguna.create({
        nama            : req.body.nama,
        namapengguna    : req.body.namapengguna,
        email           : req.body.email,
        password        : bcrypt.hashSync(req.body.password, 8),
        updatedAt       : new Date(),
        status          : req.body.status,
        registrasi      : req.body.registrasi
    }).then(pengguna => {
        Aturan.findAll({
            where : {
                nama : {
                    [Op.or]: req.body.roles
                }
            }
        }).then(aturans => {
            pengguna.setAturans(aturans).then(() => {
                res.send("Perubahan Pengguna Sukses!");
            })
        }).catch(err => {
			res.status(500).send("Error Saat Perubahan " + err);
		});
    }).catch(err => {
		res.status(500).send("Perubahan Gagal! Error Saat Rgistrasi " + err);
	})
}

exports.hapusPengguna = (req, res) => {
    Pengguna.destroy({
        id : req.body.id
    }).then(pengguna => {
        if(pengguna === 1){
            res.send("Hapus Pengguna Sukses!");
        } else {
            res.send("Hapus Pengguna Gagal!");
        }
    }).catch(err => {
		res.status(500).send("Hapus Pengguna Gagal! Error Saat Penghapusan " + err);
	})
}