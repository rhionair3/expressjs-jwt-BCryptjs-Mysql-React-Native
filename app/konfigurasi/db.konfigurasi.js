const env = require('./env.konfigurasi.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.pengguna = require('../model/pengguna.model.js')(sequelize, Sequelize);
db.aturan = require('../model/aturan.model.js')(sequelize, Sequelize);

db.kustomer = require('../model/kustomer.model.js')(sequelize, Sequelize);
db.kustomer_server = require('../model/kustomer_server.model.js')(sequelize, Sequelize);
 
db.aturan.belongsToMany(db.pengguna, { through: 'aturan_pengguna', foreignKey: 'idAturan', otherKey: 'idPengguna'});
db.pengguna.belongsToMany(db.aturan, { through: 'aturan_pengguna', foreignKey: 'idPengguna', otherKey: 'idAturan'});

db.kustomer.hasMany(db.kustomer_server, {foreignKey: 'idKustomer', sourceKey: 'uuid'});
db.kustomer_server.belongsTo(db.kustomer, {foreignKey: 'idKustomer', targetKey: 'uuid'});
 
module.exports = db;