module.exports = {
    HOST: "localhost",
    USER: "springuser",
    PASSWORD: "1234",
    DB: "rutina_app",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};