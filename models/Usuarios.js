const db = require("./db");

const Usuarios = db.sequelize.define("usuarios", {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});



Usuarios.sync({ force: false });

module.exports = Usuarios;
