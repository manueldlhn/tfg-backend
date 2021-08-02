module.exports = app => {
    const Records = require("../controllers/historial_usuarios.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    router.post("/", authenticateToken(restricted=false), Records.create);
    //router.get("/All", authenticateToken(restricted=true), Records.findAll);
    router.get("/User/:USUARIOS_Email", authenticateToken(restricted=false), Records.findAllFromUser);
    //router.delete("/", Records.deleteAll);

    app.use("/Records",router);
};