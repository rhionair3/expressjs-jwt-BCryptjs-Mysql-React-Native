const db = require('../konfigurasi/db.konfigurasi.js');
const konfigurasi = require('../konfigurasi/konfigurasi.js');
const ATURANs = konfigurasi.ATURANs; 
const Pengguna = db.pengguna;
const Aturan = db.aturan;

cekDuplikatNamaEmail = (req, res, next) => {
    Pengguna.findOne({
        where : {
            namapengguna : req.body.namapengguna
        }
    }).then( pengguna => {
        if (pengguna) {
            res.status(400).send("Nama Pengguna Sudah Digunakan");
            return;
        }
        Pengguna.findOne({
            where : {
                email : req.body.email
            }
        }). then(pengguna => {
            if (pengguna) {
                res.status(400).send("Email Sudah Digunakan");
                return;
            }
            nect();
        })
    })
}

cekMemilikiAturan = (req, res, next) => {
    for (let i = 0; i < req.body.aturan.length; i++) {
        if (!ATURANs.includes(req.body.aturan[i].toUpperCase())) {
            !ATURANs.includes(req.body.aturan[i].toUpperCase())
        }  
    }
    next();
}

const verifikasiRegistrasi = {};
verifikasiRegistrasi.cekDuplikatNamaEmail = cekDuplikatNamaEmail;
verifikasiRegistrasi.cekMemilikiAturan = cekMemilikiAturan ;