const db = require('../konfigurasi/db.konfigurasi.js');

const Kust = db.kustomer;
const KustServer = db.kustomer_server;

exports.detailKustomer = (req, res) => {
    Kust.findOne({
        where : { uuid : req.body.uuid },
        attributes : ['uuid', 'nama', 'alamat', 'email', 'telepon', 'logo', 'status'],
        include : [{
            model : KustServer,
            attributes : ['uuid', 'nama'],
            through : {
                attributes : ['idKustomer', 'uuid']
            }
        }]
    }).then(kustomer => {
        res.status(200).json({
			"deskripsi": "Profil Kustomer",
			"kustomer": kustomer
		});
    }).catch(err => {
		res.status(500).json({
			"description": "Tidak Dapat Mengakses Halaman Profil Kustomer",
			"error": err
		});
	})
}

exports.listKustomer = (req, res) => {
    Kust.findAll({
        attributes : ['uuid', 'nama', 'alamat', 'email', 'telepon', 'logo', 'status']
    }).then(kustomers => {
		res.status(200).json({
			"deskripsi": "List Kustomer",
			"kustomers": kustomers
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Tidak Dapat Menampilkan List Kustomer",
			"error": err
		});
	})
}

exports.tambahKustomer = (req, res) => {
    console.log('Proses Tambah Kustomer');

    Kust.create({
        nama       : req.body.nama,
        alamat	   : req.body.alamat,
        email      : req.body.email,
        telepon    : req.body.telepon,
        logo       : req.body.logo,
        createdAt  : new Date(),
        status     : req.body.status,
	}).then(() => {
    	res.send("Penambahan Kustomer Sukses!");
    }).catch(err => {
		res.status(500).send("Penambahan Gagal! Error Saat Penambahan Kustomer " + err);
	})
}

exports.editKustomer = (req, res) => {
    console.log('Proses Update Kustomer');

    Kust.update({
        nama       : req.body.nama,
        alamat	   : req.body.namapengguna,
        email      : req.body.email,
        telepon    : req.body.telepon,
        logo       : req.body.logo,
        updatedAt  : new Date(),
        status     : req.body.status,
	},{
		where : { uuid : req.body.uuidkust }
	}).then(() => {
    	res.send("Penambahan Kustomer Sukses!");
    }).catch(err => {
		res.status(500).send("Penambahan Gagal! Error Saat Penambahan Kustomer " + err);
	})
}

exports.hapusKustomer = (req, res) => {
    Kust.destroy({
        uuid : req.body.uuidkust
    }).then(kustomer => {
        if(kustomer === 1){
            res.send("Hapus Kustomer Sukses!");
        } else {
            res.send("Hapus Kustomer Gagal!");
        }
    }).catch(err => {
		res.status(500).send("Hapus Kustomer Gagal! Error Saat Penghapusan " + err);
	})
}

exports.listServer = (req, res) => {
    KustServer.findAll({
        where : { kustUUID : req.body.kustUUID },
        attributes : ['uuid', 'kustUUID', 'nama', 'host', 'hostip', 'namapengguna', 'password', 'status']
    }).then(kustserver => {
		res.status(200).json({
			"deskripsi": "List Server Kustomer",
			"kustserver": kustserver
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Tidak Dapat Menampilkan List Kustomer Server",
			"error": err
		});
	})
}

exports.detailServer = (req, res) => {
	KustServer.findOne({
		where : { uuid : req.body.uuid},
		attributes : ['uuid', 'kustUUID', 'nama', 'host', 'hostip', 'namapengguna', 'password', 'status']
	}).then(detailserver => {
		res.status(200).json({
			"deskripsi" : "Detail Server",
			"detailserver" : detailserver
		})
	}).catch(err => {
		res.status(500).json({
			"description": "Tidak Dapat Menampilkan Detail Server",
			"error": err
		});
	})
}

exports.tambahServer = (req, res) => {
    console.log('Proses Tambah Server');

    KustServer.create({
		kustUUID     : req.body.kustUUID,
        nama         : req.body.nama,
        host	     : req.body.namapengguna,
        hostip       : req.body.email,
        namapengguna : req.body.telepon,
        password     : req.body.logo,
        createdAt    : new Date(),
        status       : req.body.status,
	}).then(() => {
    	res.send("Penambahan Server Sukses!");
    }).catch(err => {
		res.status(500).send("Penambahan Gagal! Error Saat Penambahan Server " + err);
	})
}

exports.editServer = (req, res) => {
    console.log('Proses Edit Server');

    KustServer.update({
        kustUUID     : req.body.kustUUID,
        nama         : req.body.nama,
        host	     : req.body.host,
        hostip       : req.body.email,
        namapengguna : req.body.namapengguna,
        password     : req.body.password,
        createdAt    : new Date(),
        status       : req.body.status,
	},{
		where : { uuid : req.body.uuidserver }
	}).then(() => {
    	res.send("Perubahan Server Sukses!");
    }).catch(err => {
		res.status(500).send("Perubahan Gagal! Error Saat Perubahan Server " + err);
	})
}

exports.hapusServer = (req, res) => {
    Kust.destroy({
        uuid : req.body.uuidserver
    }).then(server => {
        if(server === 1){
            res.send("Hapus Server Sukses!");
        } else {
            res.send("Hapus Server Gagal!");
        }
    }).catch(err => {
		res.status(500).send("Hapus Server Gagal! Error Saat Penghapusan " + err);
	})
}

