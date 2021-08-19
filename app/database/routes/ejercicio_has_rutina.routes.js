/* ---------------------------
 *    Nombre del fichero: ejercicio_has_rutina.routes.js
 *    Descripción: Fichero que contiene las rutas en las que escuchará el servidor
 *                 para la gestión de la tabla ejercicio_has_rutina.
 *    Contenido: Función que define las peticiones HTTP (tipo y ruta que atiende) 
 *               relacionadas con la tabla ejercicio_has_rutina.        
 * ---------------------------  
 */


/* --------------------------
 *    Nombre de la Función: - (ejercicio_has_rutina.routes)
 *    Funcionamiento: Añade al objeto router las rutas que escuchará y bajo qué método HTTP
 *                    sobre la tabla ejercicio_has_rutina
 *    Argumentos que recibe: 
 *          - app: Objeto de aplicación del servidor.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = app => {
    const WorkoutRoutine = require("../controllers/ejercicio_has_rutina.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    // Formato: router.<metodo_http>('/ruta/escuchada', [middleware opcional], controlador)
    
    router.post("/", authenticateToken(restricted=true), WorkoutRoutine.create);
    router.get("/All", authenticateToken(restricted=true), WorkoutRoutine.findAll);
    //router.get("/Workout/:EJERCICIO_ej_id", WorkoutRoutine.findAllRoutines); // En desuso
    router.get("/Routine/:RUTINA_rut_id", authenticateToken(restricted=false), WorkoutRoutine.findAllWorkouts);
    router.put("/:EJERCICIO_ej_id/:RUTINA_rut_id", authenticateToken(restricted=true),  WorkoutRoutine.update);
    router.delete("/Workout-&-Routine/:EJERCICIO_ej_id/:RUTINA_rut_id", WorkoutRoutine.delete);
    router.delete("/Workout/:EJERCICIO_ej_id", WorkoutRoutine.deleteFromAllRoutines);
    router.delete("/Routine/:RUTINA_rut_id/", WorkoutRoutine.deleteAllWorkouts);
    
    //router.delete("/", WorkoutRoutine.deleteAll);

    app.use("/WorkoutRoutine",router);
};