const jwt = require('jsonwebtoken');
const request = require('request');
const bcrypt = require("bcrypt");

module.exports = (req,res) => {
    // Modify User
    var resData = {
        ok: false,
        message: '',
    };

    if(req.body.Password != undefined) req.body.Password = bcrypt.hashSync(req.body.Password, 10);

    request.put({url: 'http://localhost:3000/User/'+req.params.email, body: req.body, json: true,}, (error,response,body) => {
        
        if(error || body == '' || !body.Email){
            error ? resData.message = error : resData.message = "Ha habido un error al procesar el registro.";
        } else {
            resData.ok = true;
            resData.message = "Registro realizado con éxito.";
        }
        console.log(resData);
        res.send(resData);
    });

}