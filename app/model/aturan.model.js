module.exports = (sequelize, Sequelize) => {
    const Aturan = sequelize.define('aturans', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        nama: {
            type : Sequelize.STRING
        }
    });

    return Aturan;
}