/* ---------------------------
 *    Nombre del fichero: login.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor para el login       
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) relacionadas con el login.       
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (login.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre el login
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {

    const router = require("express").Router();
    const login = require("../controllers/login");

    // Formato: router.<metodo_http>('/ruta/escuchada', controlador)

    router.post('/login', login);

    app.use("/Auth", router);
};