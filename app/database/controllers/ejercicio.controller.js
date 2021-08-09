/* ---------------------------
 *    Nombre del fichero: ejercicio.controller.js
 *    Descripción: Fichero que recoge el controlador de ejercicio.
 *    Contenido: Funciones de la API Rest para controlar la tabla correspondiente de la bbdd:
 *      - create
 *      - findAll
 *      - findOne
 *      - update
 *      - delete
 *      - deleteAll       
 * ---------------------------  
 */

const { Rol } = require("../../authentication/config/Rol");

const {sequelize, db} = require("../database");

const Ejercicio = db.ejercicio;

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
    // Comprobación de si el cuerpo de la petición está vacío
    if (!req.body) {
        res.status(400).send({
          message: "No se puede crear un ejercicio vacío."
        });
        return;
    } 

    // Objeto ejercicio recibido en la petición
    const ejercicio = {
        Nombre: req.body.Nombre,
        Subtitulo: req.body.Subtitulo,
        Descripcion: req.body.Descripcion,
        Estado_forma: req.body.Estado_forma,
        Ubicacion: req.body.Ubicacion,
        Podometro: req.body.Podometro,
        Video: req.body.Video,
        USUARIOS_Email: req.body.USUARIOS_Email  
    }

    // Ejecutamos el método create definido en el modelo de la bbdd
    Ejercicio.create(ejercicio)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al crear el Usuario."
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

    // offset y usuario del objeto request
    const offset = req.query.offset;
    const user = req.user; 

    // Definimos una sub-petición empleada para extraer todos los ejercicios que pertenecen al usuario que hace la petición
    const subQuery = sequelize.dialect.queryGenerator.selectQuery('usuario_has_ejercicio', {
        attributes: ['ejercicio_id'],
        where: {
            usuario_email: user.Email,
        }
    })
    .slice(0,-1); // Elimina el ;

    // Ejecutamos el método findAll definido en el modelo correspondiente de la bbdd.
    Ejercicio.findAll({
        where: 
            // Si el rol del usuario solicitante es "Usuario", se utilizará la subQuery en where 
            // (sólo devolverá aquellos prescritos al usuario)
            user.Rol == Rol.Usuario
                ?
            {
                ej_id: [sequelize.literal(subQuery)]
            }
                :
            {},
        offset: parseInt(offset),
        limit: 10,
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los ejercicio."
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

    // Extraemos el id del ejercicio solicitado
    const ej_id = req.params.ej_id;

    // Ejecutamos el método findByPk definido en el modelo correspondiente de la bbdd.
    Ejercicio.findByPk(ej_id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al obtener ejercicio con ej_id= " +ej_id
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

    // Obtenemos el id de ejercicio enviado por el ususario
    const ej_id = req.params.ej_id;

    // Ejecutamos el método update definido en el modelo de la bbdd correspondiente.
    Ejercicio.update(req.body,{
        // Empleamos where para indicar el id de ejercicio concreto a modificar
        where: { ej_id: ej_id }
    })
    .then(num => {
        // Tratamos la respuesta recibida.
        if(num==1){
            res.send({
                message: "Se ha actualizado correctamente el ejercicio."
              });
        } else {
            res.send({
                message: `No se puede actualizar el ejercicio con ej_id=${ej_id}`
              });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar ejercicio con ej_id= " + ej_id
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
    // Obtenemos el id de ejercicio especificado por el usuario
    const ej_id = req.params.ej_id;

    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente.
    Ejercicio.destroy({
        // Empleamos where para filtrar por el id de ejercicio concreto
        where: { ej_id: ej_id },
        truncate: false,
    })
    .then( num => {
        // Tratamos la respuesta recibida
        if(num==1){
            res.send({
                message: "Se ha eliminado correctamente el ejercicio."
              });
        } else {
            res.send({
                message: "No se puede eliminar el ejercicio. Quizá no se encontró o el cuerpo de la petición está vacío."
              });
        }
    })
    .catch( err => {
        res.send({
            message: "No se ha podido eliminar el ejercicio con ej_id= " + ej_id
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
    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente.
    Ejercicio.destroy({
        // Where vacío para no filtrar nada.
        where: {},
        // Truncate a false para que la tabla no se elimine al ser vaciada.
        truncate: false
    })
    .then(nums => {
        // Tratamos la respuesta recibida.
        res.send({ message: `${nums} ejercicio han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los ejercicio."
          });
    });
};
