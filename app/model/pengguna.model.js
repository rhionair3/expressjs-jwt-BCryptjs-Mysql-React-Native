module.exports = (sequelize, Sequelize) => {
    const Pengguna = Sequelize.define('penggunas', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: Sequelize.STRING
        },
        namaPengguna: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        createAt : {
            type : Sequelize.DATE
        },
        updateAt : {
            type : Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('ACTIVE', 'INACTIVE')
        },
        registrasi: {
            type: Sequelize.INTEGER('REGISTERED', 'UNREGISTERED')
        }
    });

    return Pengguna;
}