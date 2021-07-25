const Sequelize = require('sequelize');
const dbConfig = require("./config/db.config");
const initDB = require("./models/init-models");


const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = initDB.initModels(sequelize);

module.exports =  { sequelize, db };

/*
 COMANDO PARA SEQUELIZE AUTO
 node node_modules\sequelize-auto\bin\sequelize-auto -o "./app/database/models" -d rutina_app -h localhost -u springuser -p 3306 -x 1234 -e mysql

*/