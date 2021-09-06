/* ---------------------------
 *    Nombre del fichero: register.js
 *    Descripción: Fichero que recoge el controlador de registro.
 *    Contenido: Función para registrar al usuario en el sistema.       
 * ---------------------------  
 */

const request = require('request');
const { Rol } = require('../config/Rol');
const bcrypt = require("bcrypt");


/* --------------------------
 *    Nombre de la Función: - (register)
 *    Funcionamiento: Crea un nuevo usuario en el sistema con la información proporcionada.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = (req,res) => {

    // Objeto usado para enviar la respuesta
    var resData = {
        message: 0,
        ok: false,
    };


    /* Comprobar si el usuario existe previamente */
    request.get({url:'http://localhost:3000/User/'+req.body.Email}, (error, response, body) => {

        if (error){ // Si la petición arroja un error.
            error ? resData.message = error : resData.message = 'Ha habido un error al procesar el registro.';
            res.send(resData);
        } else if(body != '') { // Si ha devuelto un usuario correctamente, es que existe.
            resData.message = "El usuario "+req.body.Email+" ya existe. Por favor revise el correo electrónico o inicie sesión."
            res.send(resData);
        } else { // Si no hay error pero el cuerpo de la respuesta está vacío, no existe.
            // Como no existe, proseguimos con el registro.
            // Contraseña cifrada
            const hash = bcrypt.hashSync(req.body.Password, 10);

            // Objeto usuario que se va a introducir en la bbdd
            const userGiven = {
                    Email: req.body.Email,
                    Password: hash,
                    Nombre: req.body.Nombre,
                    Fecha_Nacimiento: req.body.Fecha_Nacimiento,
                    Enabled: req.body.Enabled ? req.body.Enabled : false,
                    Telefono: req.body.Telefono,
                    Rol: Rol.Usuario,
            };

            // Petición a la API Rest para crear un nuevo usuario en la bbdd
            request.post({url: 'http://localhost:3000/User', body: userGiven, json: true,}, (error,response,body) => {
                
                if(error || body == '' || !body.Email){
                    error ? resData.message = error : resData.message = "Ha habido un error al procesar el registro.";
                } else {
                    resData.ok = true;
                    resData.message = "Registro realizado con éxito.";
                }
                res.send(resData);
            });
        }
        
    });
}