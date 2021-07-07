module.exports = app => {
    const Usuarios = require("../controllers/usuario.controller.js");
    const authenticateToken = require("../../authentication/middlewares/authenticateToken.js");
    var router = require("express").Router();

    router.post("/", Usuarios.create);
    router.get("/", authenticateToken(restricted=true), Usuarios.findAll);
    router.get("/:email", Usuarios.findOne);
    router.put("/:email", authenticateToken(restricted=false), Usuarios.update);
    
    // No se contempla su uso en ningún caso del desarrollo de la app.
    //router.delete("/:email", Usuarios.delete);
    //router.delete("/", Usuarios.deleteAll);

    app.use("/User",router);
};

