module.exports = app => {

    const router = require("express").Router();
    const register = require("../controllers/register");    


    router.post('/register', register);

    app.use("/Auth", router);

};