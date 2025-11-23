require("dotenv").config();
// Importação da classe Sequelize para criar a conexão com o banco
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2")
// Criação da instância do Sequelize, configurada para conectar ao MySQL
const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: "mysql",
        dialectModule: mysql2,
        logging: false,
        pool: {max: 5, min: 0, idle:300000, acquire: 100000}
    }
);

(async () => {
    try{
        await sequelize.authenticate()
        console.log("Banco de dados conectado com sucesso");        
    }catch(erro){
        console.log("Erro ao se conectar: " + erro);
    }
});

// Testa a conexão com o banco de dados


// Exporta a instância criada e a classe Sequelize para uso em outros módulos
module.exports = {Sequelize, sequelize};
