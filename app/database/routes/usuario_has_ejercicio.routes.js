/* ---------------------------
 *    Nombre del fichero: usuario_has_ejercicio.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor
 *                 para la gestión de la tabla usuario_has_ejercicio.
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) 
 *               relacionadas con la tabla usuario_has_ejercicio.        
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (usuario_has_ejercicio.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre la tabla usuario_has_ejercicio
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {
    const UserWorkout = require("../controllers/usuario_has_ejercicio.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    // Formato: router.<metodo_http>('/ruta/escuchada', [middleware opcional], controlador)

    router.post("/", authenticateToken(restricted=true), UserWorkout.create);

    router.get("/User/:usuario_email", authenticateToken(restricted=false), UserWorkout.findAllWorkouts);
    // router.get("/Workout/:ejercicio_id", UserWorkout.findAllUsers); // En desuso
    
    router.put("/User-&-Workout/:usuario_email/:ejercicio_id",authenticateToken(restricted=true), UserWorkout.update);
    
    router.delete("/User-&-Workout/:usuario_email/:ejercicio_id",authenticateToken(restricted=true), UserWorkout.delete);
    //router.delete("/User/:usuario_email", authenticateToken(restricted=true), UserWorkout.deleteAllWorkouts); // En desuso
    //router.delete("/Workout/:ejercicio_id", authenticateToken(restricted=true), UserWorkout.deleteFromAllUsers); // En desuso
    //router.delete("/", UserWorkout.deleteAll);

    app.use("/UserWorkout",router);
};