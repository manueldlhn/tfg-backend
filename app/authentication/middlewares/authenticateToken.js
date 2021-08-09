/* ---------------------------
 *    Nombre del fichero: authenticateToken.js
 *    Descripción: Fichero que contiene el middleware para verificar
 *                 el usuario que hace una petición al servidor.       
 *    Contenido: Función para verificar al usuario.   
 * ---------------------------  
 */

const jwt = require('jsonwebtoken');
const { Rol } = require('../config/Rol');


/* --------------------------
 *    Nombre de la Función: - (authenticateToken)
 *    Funcionamiento: Extrae el token de la petición y lo verifica.
 *                    Adicionalmente, si se solicita que el rol sea de Especialista,
 *                    también se controlará.
 *    Argumentos que recibe:
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará
 *                 al usuario.
 *          - next: Next (Siguiente). Función de escape del middleware, que pasará la petición
 *                  al controlador una vez procesada por la función.
 *          - restricted: Restringido. Variable boolean que indica si se requiere que el usuario
 *                        sea especialista, o sólo se requiere que esté autenticado.
 *    Devuelve: Nada (void).
 * --------------------------
 */

module.exports = (restricted) => {
    return (req,res,next) => {
        // Extraemos el token del usuario
        const token = req.headers['x-auth-token'];

        if(token==null) return res.status(401).send({message: "No se ha encontrado token"});

        // Se verifica que el token es válido (y el rol es adecuado)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err || (restricted && user.Rol != Rol.Especialista) ) return res.status(403).send({message: "No tienes permisos"});

            // Pasamos el usuario al objeto res y devolvemos el control a la función next()
            req.user = user;
            next();
        });
    }
    
    
}