/* ---------------------------
 *    Nombre del fichero: ejercicio.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor
 *                 para la gestión de la tabla ejercicio.
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) 
 *               relacionadas con la tabla ejercicio.        
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (ejercicio.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre la tabla ejercicio
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {
    const Workout = require("../controllers/ejercicio.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    // Formato: router.<metodo_http>('/ruta/escuchada', [middleware opcional], controlador)

    router.post("/", authenticateToken(restricted=true), Workout.create);
    router.get("/", authenticateToken(restricted=false), Workout.findAll);
    // router.get("/:ej_id", Workout.findOne); // En desuso
    router.put("/:ej_id", authenticateToken(restricted=true), Workout.update);
    router.delete("/:ej_id", authenticateToken(restricted=true), Workout.delete);

    //router.delete("/", Workout.deleteAll);

    app.use("/Workout",router);
};