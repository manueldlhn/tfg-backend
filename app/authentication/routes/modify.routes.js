/* ---------------------------
 *    Nombre del fichero: modify.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor para el modify       
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) relacionadas con el modify.       
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (modify.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre el modify
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */


const authenticateToken = require("../middlewares/authenticateToken");

module.exports = app => {

    const router = require("express").Router();
    const modify = require("../controllers/modify");

    // Formato: router.<metodo_http>('/ruta/escuchada', controlador)

    router.post('/modify', authenticateToken(restricted=false), modify);

    app.use("/Auth", router);

};