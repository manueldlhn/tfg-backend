/* ---------------------------
 *    Nombre del fichero: rutina.controller.js
 *    Descripción: Fichero que recoge el controlador de rutina.
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

const Rutina = db.rutina;

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
    if (!req.body) {
        res.status(400).send({
          message: "No se puede crear una rutina vacía."
        });
        return;
    } 

    // Extraemos la información de la petición
    const rutina = {
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
        Info_Rutina: req.body.Info_Rutina,
        Pub_priv: req.body.Pub_priv,
        USUARIOS_Email: req.body.USUARIOS_Email
    };


    // Ejecutamos el método create definido en el modelo de la bbdd correspondiente.
    Rutina.create(rutina)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al crear la Rutina."
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

    // Extraemos los datos de la petición
    const offset = req.query.offset;
    const user = req.user;

    // Definimos una sub-petición empleada para extraer todas las rutinas que pertenecen al usuario que hace la petición
    const subQuery = sequelize.dialect.queryGenerator.selectQuery('usuario_has_rutina', {
        attributes: ['rutina_id'],
        where: {
            usuario_email: user.Email,
        }
    })
    .slice(0,-1); // Elimina el ;

    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente.
    Rutina.findAll({
        where: 
            // Si el rol del usuario solicitante es "Usuario", se utilizará la subQuery en where 
            // (sólo devolverá aquellas prescritos al usuario)
            user.Rol == Rol.Usuario 
                ? 
            {
                rut_id: [sequelize.literal(subQuery)]
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
              err.message || "Ha habido un error al extraer las rutinas."
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

    // Extraemos el id de la rutina solicitada
    const rut_id = req.params.rut_id;

    // Ejecutamos el método findByPk definido en el modelo de la bbdd correspondiente
    Rutina.findByPk(rut_id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al obtener rutina con rut_id= " + rut_id
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
    // Extraemos el id de la rutina solicitada
    const rut_id = req.params.rut_id;

    // Ejecutamos el método update definido en el modelo de la bbdd correspondiente.
    Rutina.update(req.body, {
        // Con Where filtramos por el id de rutina específico
        where: { rut_id: rut_id }
    })
    .then(num => {
        // Tratamos la respuesta recibida
        if(num==1){
            res.send({
                message: "Se ha actualizado correctamente la rutina."
              });
        } else {
            res.send({
                message: "No se puede actualizar la rutina. Quizá no se encontró o el cuerpo de la petición está vacío."
              });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar rutina con rut_id= " + rut_id
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

    // Extraemos el id de la rutina especificado
    const rut_id = req.params.rut_id;

    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente.
    Rutina.destroy({
        // Con where especificamos el id de la rutina a eliminar
        where: { rut_id: rut_id }
    })
    .then( num => {
        // Tratamos la respuesta recibida.
        if(num==1){
            res.send({
                message: "Se ha eliminado correctamente la rutina."
              });
        } else {
            res.send({
                message: "No se puede eliminar la rutina. Quizá no se encontró o el cuerpo de la petición está vacío."
              });
        }
    })
    .catch( err => {
        res.send({
            message: "No se ha podido eliminar la rutina con rut_id= " + rut_id
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
    Rutina.destroy({
        // Where vacío para no filtrar nada
        where: {},
        // Truncate a false para que la tabla no se elimine al vaciarla
        truncate: false
    })
    .then(nums => {
        // Tratamos la respuesta recibida
        res.send({ message: `${nums} rutinas han sido eliminadas.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar las rutinas."
          });
    });
};
