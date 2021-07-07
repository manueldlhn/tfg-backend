module.exports = app => {
    const Routine = require("../controllers/rutina.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    router.post("/", authenticateToken(restricted=true), Routine.create);
    router.get("/", authenticateToken(restricted=false), Routine.findAll);
    router.get("/:rut_id", Routine.findOne);
    router.put("/:rut_id", authenticateToken(restricted=true), Routine.update);
    router.delete("/:rut_id", authenticateToken(restricted=true), Routine.delete);
    
    //router.delete("/", Routine.deleteAll);

    app.use("/Routine",router);
};