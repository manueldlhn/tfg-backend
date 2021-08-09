/* ---------------------------
 *    Nombre del fichero: usuario.controller.js
 *    Descripción: Fichero que recoge el controlador de usuario.
 *    Contenido: Funciones de la API Rest para controlar la tabla correspondiente de la bbdd:
 *      - create
 *      - findAll
 *      - findOne
 *      - update
 *      - delete
 *      - deleteAll       
 * ---------------------------  
 */

const {db} = require("../database");
const bcrypt = require('bcrypt');

const Usuarios = db.usuarios;

/* --------------------------
 *    Nombre de la Función: create
 *    Funcionamiento: Crea una nueva entrada en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.create = (req, res) => {
    // Comprobamos que el cuerpo de la petición no esté vacío
    if (!req.body.Email) {
        res.status(400).send({
          message: "No se puede crear un usuario vacío.",
        });
        return;
    } 

    // Obtenemos el usuario de la petición
    const usuario = {
        Email: req.body.Email,
        Password: req.body.Password,
        Nombre: req.body.Nombre,
        Fecha_Nacimiento: req.body.Fecha_Nacimiento,
        Telefono: req.body.Telefono,
        Rol: req.body.Rol,
    };

    // Ejecutamos el método create definido en el modelo de la bbdd correspondiente.
    Usuarios.create(usuario)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al crear el Usuario.",
          });
    });
};


/* --------------------------
 *    Nombre de la Función: findAll
 *    Funcionamiento: Obtiene todos los elementos de la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAll = (req, res) => {
    const offset = req.query.offset;

    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente
    Usuarios.findAll({
        offset: parseInt(offset),
        limit: 10,
    })
    .then(data => {
        
        // Eliminamos toda referencia a la contraseña antes de devolver los datos.
        data.forEach( (object,i) => {            
            delete object.dataValues.Password;
            delete object._previousDataValues.Password;
            object._options.attributes.splice(1,1);
        });
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los usuarios."
        });
    });
};


/* --------------------------
 *    Nombre de la Función: findOne
 *    Funcionamiento: Obtiene un elemento de la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findOne = (req, res) => {
    // Extraemos el email del usuario a solicitar
    const email = req.params.email;

    // Ejecutamos el método findByPk definido en el modelo de la bbdd correspondiente
    Usuarios.findByPk(email)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al obtener usuario con email= " + email
          });
    });
};


/* --------------------------
 *    Nombre de la Función: update
 *    Funcionamiento: Actualiza un elemento de la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.update = (req, res) => {
    // Extraemos el email de la petición
    const email = req.params.email;

    // Si se solicita modificar la contraseña, se cifra
    if(req.body.Password != undefined) req.body.Password = bcrypt.hashSync(req.body.Password, 10);

    // Ejecutamos el método update definido en el modelo de la bbdd correspondiente
    Usuarios.update(req.body,{
        // Usando where filtramos por el email del usuario concreto
        where: { Email: email }
    })
    .then(num => {
        // Tratamos la respuesta recibida
        if(num==1){
            res.send({
                ok: true,
                message: "Se ha actualizado correctamente el usuario."
              });
        } else {
            res.send({
                ok: false,
                message: `No se puede actualizar el usuario con email=${email}`
              });
        }
    })
    .catch(err => {
        res.status(500).send({
            ok: false,
            message: "Error al actualizar usuario con email= " + email
          });
    });
};


/* --------------------------
 *    Nombre de la Función: delete
 *    Funcionamiento: Elimina un elemento de la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.delete = (req, res) => {
    // Extraemos el email del usuario que se desea eliminar
    const email = req.params.email;

    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente
    Usuarios.destroy({
        // Con where filtramos por el email concreto
        where: { Email: email }
    })
    .then( num => {
        // Tratamos la respuesta recibida
        if(num==1){
            res.send({
                message: "Se ha eliminado correctamente el usuario."
              });
        } else {
            res.send({
                message: "No se puede eliminar el usuario. Quizá no se encontró o el cuerpo de la petición está vacío."
              });
        }
    })
    .catch( err => {
        res.send({
            message: "No se ha podido eliminar el usuario con email= " + email
          });
    });
};


/* --------------------------
 *    Nombre de la Función: deleteAll
 *    Funcionamiento: Elimina todos los elementos de la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteAll = (req, res) => {
    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente
    Usuarios.destroy({
        // Where vacío para no filtrar
        where: {},
        // Truncate false para no borrar la tabla al vaciarla.
        truncate: false
    })
    .then(nums => {
        // Tratamos la respuesta recibida.
        res.send({ message: `${nums} usuarios han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los usuarios."
          });
    });
};
