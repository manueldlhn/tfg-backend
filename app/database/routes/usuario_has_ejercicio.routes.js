const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");

module.exports = app => {
    const UserWorkout = require("../controllers/usuario_has_ejercicio.controller.js");
    var router = require("express").Router();

    router.post("/", authenticateToken(restricted=true), UserWorkout.create);
    router.get("/User/:usuario_email", UserWorkout.findAllWorkouts);
    router.get("/Workout/:ejercicio_id", UserWorkout.findAllUsers);
    router.put("/User-&-Workout/:usuario_email/:ejercicio_id",authenticateToken(restricted=true), UserWorkout.update);
    router.delete("/User-&-Workout/:usuario_email/:ejercicio_id",authenticateToken(restricted=true), UserWorkout.delete);
    router.delete("/User/:usuario_email", authenticateToken(restricted=true), UserWorkout.deleteAllWorkouts);
    router.delete("/Workout/:ejercicio_id", authenticateToken(restricted=true), UserWorkout.deleteFromAllUsers);
    
    //router.delete("/", UserWorkout.deleteAll);

    app.use("/UserWorkout",router);
};