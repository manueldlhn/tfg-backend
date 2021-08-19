/* ---------------------------
 *    Nombre del fichero: usuario_has_rutina.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor
 *                 para la gestión de la tabla usuario_has_rutina.
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) 
 *               relacionadas con la tabla usuario_has_rutina.        
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (usuario_has_rutina.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre la tabla usuario_has_rutina
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */



module.exports = app => {
    const UserRoutine = require("../controllers/usuario_has_rutina.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    // Formato: router.<metodo_http>('/ruta/escuchada', [middleware opcional], controlador)

    router.post("/", authenticateToken(restricted=true), UserRoutine.create);

    router.get("/User/:usuario_email", authenticateToken(restricted=false),UserRoutine.findAllRoutines);
    router.get("/Routine/:rutina_id", UserRoutine.findAllUsers);
    
    router.put("/User-&-Routine/:usuario_email/:rutina_id", authenticateToken(restricted=true),UserRoutine.update)
    
    router.delete("/User-&-Routine/:usuario_email/:rutina_id", authenticateToken(restricted=true),UserRoutine.delete);
    router.delete("/User/:usuario_email", authenticateToken(restricted=true), UserRoutine.deleteAllRoutines);
    router.delete("/Routine/:rutina_id", authenticateToken(restricted=true), UserRoutine.deleteFromAllUsers);
    
    //router.delete("/", UserRoutine.deleteAll);

    app.use("/UserRoutine",router);
};