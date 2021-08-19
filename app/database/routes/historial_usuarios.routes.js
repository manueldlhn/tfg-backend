/* ---------------------------
 *    Nombre del fichero: historial_usuarios.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor
 *                 para la gestión de la tabla historial_usuarios.
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) 
 *               relacionadas con la tabla historial_usuarios.        
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (historial_usuarios.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre la tabla historial_usuarios
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {
    const Records = require("../controllers/historial_usuarios.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    // Formato: router.<metodo_http>('/ruta/escuchada', [middleware opcional], controlador)

    router.post("/", authenticateToken(restricted=false), Records.create);
    //router.get("/All", authenticateToken(restricted=true), Records.findAll);
    router.get("/User/:USUARIOS_Email", authenticateToken(restricted=false), Records.findAllFromUser);
    //router.delete("/", Records.deleteAll);

    app.use("/Records",router);
};