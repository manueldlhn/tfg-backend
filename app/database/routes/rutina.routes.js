/* ---------------------------
 *    Nombre del fichero: rutina.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor
 *                 para la gestión de la tabla rutina.
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) 
 *               relacionadas con la tabla rutina.        
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (rutina.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre la tabla rutina
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {
    const Routine = require("../controllers/rutina.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    // Formato: router.<metodo_http>('/ruta/escuchada', [middleware opcional], controlador)

    router.post("/", authenticateToken(restricted=true), Routine.create);
    router.get("/", authenticateToken(restricted=false), Routine.findAll);
    // router.get("/:rut_id", Routine.findOne); // En desuso
    router.put("/:rut_id", authenticateToken(restricted=true), Routine.update);
    router.delete("/:rut_id", authenticateToken(restricted=true), Routine.delete);
    
    //router.delete("/", Routine.deleteAll);

    app.use("/Routine",router);
};