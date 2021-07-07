module.exports = app => {

    const router = require("express").Router();
    const login = require("../controllers/login");


    router.post('/login', login);

    app.use("/Auth", router);

};