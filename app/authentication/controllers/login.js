const jwt = require('jsonwebtoken');
const request = require('request');
const bcrypt = require("bcrypt");

module.exports = (req,res) => {
    // Authenticate User
    
    const userGiven = {
        Email: req.body.Email,
        Password: req.body.Password,
    };

    var resData = {
        accessToken: '',
        message: 0,
        ok: true,
    };
    
    console.log(userGiven);

    request.get('http://localhost:3000/User/'+userGiven.Email, (error,response,body) => {
        if(!error && body != ''){
            const userDB = JSON.parse(body);
            
            if(bcrypt.compareSync(userGiven.Password, userDB.Password)){
                userDB.Password = userGiven.Password;

                console.log(userDB);

                const accessToken = jwt.sign(userDB, process.env.ACCESS_TOKEN_SECRET);
                resData.accessToken = accessToken;
            } else {
                resData.message = 'Contraseña incorrecta';
                resData.ok = false;
            }
        } else {
            // No se ha obtenido el usuario.
            error ? resData.message = error : resData.message = "No se ha encontrado un usuario con el Email: "+userGiven.Email;
            resData.ok = false;
        }
        res.send(resData);
    });
}