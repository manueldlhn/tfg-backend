/* ---------------------------
 *    Nombre del fichero: login.js
 *    Descripción: Fichero que recoge el controlador de login.
 *    Contenido: Función para autenticar al usuario.       
 * ---------------------------  
 */


const jwt = require('jsonwebtoken');
const request = require('request');
const bcrypt = require("bcrypt");


/* --------------------------
 *    Nombre de la Función: - (login)
 *    Funcionamiento: Compara la información proporcionada por el usuario
 *                    con la de la bbdd con el objetivo de autenticarlo.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = (req,res) => {
    

    // Datos enviados por el usuario.
    const userGiven = {
        Email: req.body.Email,
        Password: req.body.Password,
    };

    // Objeto usado para enviar la respuesta.
    var resData = {
        accessToken: '',
        message: 0,
        ok: true,
    };

    // Petición a la API para obtener el usuario de la bbdd
    request.get('http://localhost:3000/User/'+userGiven.Email, (error,response,body) => {
        if(!error && body != ''){
            const userDB = JSON.parse(body);
            
            // Comparar la contraseña cifrada
            if(bcrypt.compareSync(userGiven.Password, userDB.Password)){
                // Ciframos el usuario para devolverlo como JSONWebToken
                userDB.Password = userGiven.Password;
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