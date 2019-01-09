model.exports = (sequelize, Sequelize) => {
    const Aturan = Sequelize.define('aturans', {
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