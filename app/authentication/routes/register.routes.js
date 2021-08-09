/* ---------------------------
 *    Nombre del fichero: register.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor para el registro       
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) relacionadas con el registro.       
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (register.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre el registro
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {

    const router = require("express").Router();
    const register = require("../controllers/register");    

    // Formato: router.<metodo_http>('/ruta/escuchada', controlador)

    router.post('/register', register);

    app.use("/Auth", router);

};