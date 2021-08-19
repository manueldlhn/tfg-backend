/* ---------------------------
 *    Nombre del fichero: usuario.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor
 *                 para la gestión de la tabla usuario.
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) 
 *               relacionadas con la tabla usuario.        
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (usuario.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre la tabla usuario
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {
    const Usuarios = require("../controllers/usuario.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    // Formato: router.<metodo_http>('/ruta/escuchada', [middleware opcional], controlador)
    
    router.post("/", Usuarios.create);
    router.get("/", authenticateToken(restricted=true), Usuarios.findAll);
    router.get("/:email", Usuarios.findOne);
    router.put("/:email", authenticateToken(restricted=false), Usuarios.update);
    
    // No se contempla su uso en ningún caso de la app.
    //router.delete("/:email", Usuarios.delete);
    //router.delete("/", Usuarios.deleteAll);

    app.use("/User",router);
};

