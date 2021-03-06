module.exports = (sequelize, Sequelize) => {
    const Kustomer_server = sequelize.define('Kustomer_server', {
        uuid: {
            type : Sequelize.UUID,
            defaultValue : Sequelize.UUIDV1,
            primaryKey : true
        },
        kustUUID: {
            type : Sequelize.UUID
        },
        nama: {
            type : Sequelize.STRING
        },
        host: {
            type : Sequelize.STRING
        },
        hostip : {
            type : Sequelize.STRING
        },
        namaPengguna: {
            type : Sequelize.STRING
        },
        password: {
            type : Sequelize.STRING
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

    return Kustomer_server;
}