module.exports = app => {
    const Workout = require("../controllers/ejercicio.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    router.post("/", authenticateToken(restricted=true), Workout.create);
    router.get("/", authenticateToken(restricted=false), Workout.findAll);
    router.get("/:ej_id", Workout.findOne);
    router.put("/:ej_id", authenticateToken(restricted=true), Workout.update);
    router.delete("/:ej_id", authenticateToken(restricted=true), Workout.delete);

    //router.delete("/", Workout.deleteAll);

    app.use("/Workout",router);
};