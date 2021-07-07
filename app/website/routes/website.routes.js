module.exports = app => {
    var router = require("express").Router();
    var db = require("../../database");
    
    const { requiresAuth } = require('express-openid-connect');
    
    router.get('/', (req,res,next) => {
        console.log("GET: /");
        res.render('welcome.html');
    })
    
    
    router.get('/index', requiresAuth(), (req,res,next) => {
        console.log("GET: /index");
        res.render('index.html', data=req.oidc.user);
    });

    app.use("/", router);
}


