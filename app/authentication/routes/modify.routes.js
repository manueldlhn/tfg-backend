const authenticateToken = require("../middlewares/authenticateToken");

module.exports = app => {

    const router = require("express").Router();
    const modify = require("../controllers/modify");


    router.post('/modify', authenticateToken(restricted=false), modify);

    app.use("/Auth", router);

};