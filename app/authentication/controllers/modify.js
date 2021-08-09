/* ---------------------------
 *    Nombre del fichero: modify.js
 *    Descripción: Fichero que recoge el controlador de modificar datos de usuario.     
 *    Contenido: Función para modificar datos de usuario.       
 * ---------------------------  
 */


const request = require('request');
const bcrypt = require("bcrypt");


/* --------------------------
 *    Nombre de la Función: - (modify)
 *    Funcionamiento: Altera la entrada de la bbdd del usuario correspondiente
 *                    con la información proporcionada en la petición.
 *    Argumentos que recibe:
 *          - req: Request (Petición). Objeto con la información de la petición enviada por el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = (req,res) => {
    
    // Objeto usado para enviar la respuesta
    var resData = {
        ok: false,
        message: '',
    };

    // Si se solicita modificar la contraseña, se cifra usando bcrypt
    if(req.body.Password != undefined) req.body.Password = bcrypt.hashSync(req.body.Password, 10);

    // Se realiza la petición a la API Rest para modificar el usuario en la bbdd.
    request.put({url: 'http://localhost:3000/User/'+req.params.email, body: req.body, json: true,}, (error,response,body) => {
        
        if(error || body == '' || !body.Email){
            error ? resData.message = error : resData.message = "Ha habido un error al procesar el registro.";
        } else {
            resData.ok = true;
            resData.message = "Registro realizado con éxito.";
        }
        res.send(resData);
    });

}