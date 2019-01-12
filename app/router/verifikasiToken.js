const jwt =  require('jsonwebtoken');
const konfigurasi =  require('../konfigurasi/konfigurasi.js');
const db = require('../konfigurasi/db.konfigurasi.js');

const Aturan = db.aturan;
const Pengguna = db.pengguna;

verifikasiToken = (req, res, next) => {
    console.log(req.headers['x-access-token']);
    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            autentikasi : false, pesan : "Tidak Ditemukan Token."
        });
    }

    jwt.verify(token, konfigurasi.secret, (err, decoded) => {
        if(err) {
            return res.status(500).send({
                autentikasi : false, 
                pesan : "Gagal Dalam Autentikasi Token ->" + err
            });
        }
        req.id = decoded.id;
        next();
    })
}

lvlAdmin = (req, res, next) => {
    Pengguna.findById(req.id)
        .then(pengguna => {
            URLSearchParams.getRoles().then(aturan => {
                for (let i = 0; i < pengguna.length; i++) {
                    console.log(aturan[i].name);
                    if (aturan[i].name.toUpperCase() === "ADMIN") {
                        next();
						return;
                    }
                    
                }
            })
        })
}

lvlPM = (req, res, next) => {
    Pengguna.findById(req.id)
        .then(pengguna => {
            URLSearchParams.getRoles().then(aturan => {
                for (let i = 0; i < pengguna.length; i++) {
                    console.log(aturan[i].name);
                    if (aturan[i].name.toUpperCase() === "PM") {
                        next();
                        return;
                    }
                    if (aturan[i].name.toUpperCase() === "ADMIN") {
                        next();
                        return;
                    }
                    
                }
                res.status(403)
            })
        })
}

const authJwt = {};
authJwt.verifikasiToken = verifikasiToken;
authJwt.lvlAdmin = lvlAdmin;
authJwt.lvlPM = lvlPM;

module.exports = authJwt;