const request = require('request');
const { Rol } = require('../config/Rol');
const bcrypt = require("bcrypt");


module.exports = (req,res) => {
    // Register User

    var resData = {
        message: 0,
        ok: false,
    };

    const hash = bcrypt.hashSync(req.body.Password, 10)
    
    const userGiven = {
            Email: req.body.Email,
            Password: hash,
            Nombre: req.body.Nombre,
            Fecha_Nacimiento: req.body.Fecha_Nacimiento,
            Enabled: req.body.Enabled ? req.body.Enabled : false,
            Telefono: req.body.Telefono,
            Rol: Rol.Usuario,
    };

        
        
    console.log(userGiven);

    request.post({url: 'http://localhost:3000/User', body: userGiven, json: true,}, (error,response,body) => {
        
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