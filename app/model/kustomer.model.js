module.exports = (sequelize, Sequelize) => {
    const Kustomer = Sequelize.define('Kustomer', {
        uuid: {
            type : Sequelize.UUID,
            defaultValue : Sequelize.UUIDV1,
            primaryKey : true
        },
        nama: {
            type : Sequelize.STRING
        },
        alamat: {
            type : Sequelize.STRING
        },
        email: {
            type : Sequelize.STRING
        },
        telepon: {
            type : Sequelize.STRING
        },
        logo : {
            type : Sequelize.BLOB
        },
        createAt : {
            type : Sequelize.DATE
        },
        updateAt : {
            type : Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('ACTIVE', 'INACTIVE')
        }
    });

    return Kustomer;
}