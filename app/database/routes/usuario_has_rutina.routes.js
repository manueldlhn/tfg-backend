const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");

module.exports = app => {
    const UserRoutine = require("../controllers/usuario_has_rutina.controller.js");
    var router = require("express").Router();

    router.post("/", authenticateToken(restricted=true), UserRoutine.create);
    router.get("/User/:usuario_email",UserRoutine.findAllRoutines);
    router.get("/Routine/:rutina_id", UserRoutine.findAllUsers);
    router.delete("/User-&-Routine/:usuario_email/:rutina_id", authenticateToken(restricted=true),UserRoutine.delete);
    router.delete("/User/:usuario_email", authenticateToken(restricted=true), UserRoutine.deleteAllRoutines);
    router.delete("/Routine/:rutina_id", authenticateToken(restricted=true), UserRoutine.deleteFromAllUsers);
    
    //router.delete("/", UserRoutine.deleteAll);

    app.use("/UserRoutine",router);
};