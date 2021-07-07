module.exports = app => {
    const WorkoutRoutine = require("../controllers/ejercicio_has_rutina.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    router.post("/", authenticateToken(restricted=true), WorkoutRoutine.create);
    router.get("/Workout/:EJERCICIO_ej_id", WorkoutRoutine.findAllRoutines);
    router.get("/Routine/:RUTINA_rut_id", authenticateToken(restricted=false), WorkoutRoutine.findAllWorkouts);
    router.put("/:EJERCICIO_ej_id/:RUTINA_rut_id",  WorkoutRoutine.update);
    router.delete("/Workout-&-Routine/:EJERCICIO_ej_id/:RUTINA_rut_id", WorkoutRoutine.delete);
    router.delete("/Workout/:EJERCICIO_ej_id", WorkoutRoutine.deleteFromAllRoutines);
    router.delete("/Routine/:RUTINA_rut_id/", WorkoutRoutine.deleteAllWorkouts);
    
    //router.delete("/", WorkoutRoutine.deleteAll);

    app.use("/WorkoutRoutine",router);
};