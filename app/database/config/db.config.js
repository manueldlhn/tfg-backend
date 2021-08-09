/* ---------------------------
 *    Nombre del fichero: db.config.js
 *    Descripción: Fichero que contiene los parámetros de conexión a la bbdd.
 *    Contenido: Objeto JSON con los valores de configuración de la conexión.
 * ---------------------------  
 */


/* --------------------------
 *    Nombre: - (db.config)
 *    Descripción: Contiene la información para realizar una conexión a la bbdd
 * -------------------------- 
 */

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