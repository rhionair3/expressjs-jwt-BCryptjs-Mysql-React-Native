module.exports = (sequelize, Sequelize) => {
    const Pengguna = sequelize.define('penggunas', {
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
        createdAt : {
            type : Sequelize.DATE
        },
        updatedAt : {
            type : Sequelize.DATE
        },
        aturanPengguna : {
            type: Sequelize.ENUM('USER', 'ADMIN', 'PM')
        },
        status: {
            type: Sequelize.ENUM('ACTIVE', 'INACTIVE')
        },
        registrasi: {
            type: Sequelize.ENUM('REGISTERED', 'UNREGISTERED')
        }
    });

    return Pengguna;
}