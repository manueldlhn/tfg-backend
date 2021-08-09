/* ---------------------------
 *    Nombre del fichero: ejercicio_has_rutina.controller.js
 *    Descripción: Fichero que recoge el controlador de ejercicio_has_rutina.
 *    Contenido: Funciones de la API Rest para controlar la tabla correspondiente de la bbdd:
 *      - create
 *      - findAllRoutines
 *      - findAllUsers
 *      - update
 *      - delete
 *      - deleteAllRoutines
 *      - deleteFromAllUsers
 *      - deleteAll       
 * ---------------------------  
 */

const { Rol } = require("../../authentication/config/Rol");
const {db} = require("../database");

const Usuario_has_Rutina = db.usuario_has_rutina;
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
    // Si la petición no tiene toda la información necesaria, da error
    if (!req.body.usuario_email || !req.body.rutina_id) {
        res.status(400).send({
          message: "No se puede crear un rutina vacío."
        });
        return;
    } 

    // Extracción de la información enviada por el usuario
    const user_routine = {
        usuario_email: req.body.usuario_email,
        rutina_id: req.body.rutina_id,
        especialista_email: req.body.especialista_email,
        Comentarios: req.body.Comentarios,      
    };

    // Ejecutamos el método create definido en el modelo de la bbdd correspondiente
    Usuario_has_Rutina.create(user_routine)
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
 *    Nombre de la Función: findAllRoutines
 *    Funcionamiento: Obtiene todas las entradas que asocian rutinas a un usuario concreto.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAllRoutines = (req, res) => {
    const user = req.user;

    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente
    Usuario_has_Rutina.findAll({
        // Include para incorporar a la petición información de las rutinas
        include: {
            model: Rutina,
            as: 'rutina',
            attributes: user.Rol == Rol.Especialista && ["Nombre"],
        },
        // Where para filtrar por usuario
        where: {
            usuario_email: req.params.usuario_email
        },
    })
    .then(data => {
        // Tratamos la respuesta para que cada elemento sea un único objeto
        var resData = [];
        data.forEach(item => {
            var routine = item.rutina.dataValues;
            routine.rutina_id = item.rutina_id;
            routine.Comentarios = item.Comentarios;
            routine.especialista_email = item.especialista_email;
            resData.push(routine);
        });
        res.send(resData);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los rutina."
        });
    });
};


/* --------------------------
 *    Nombre de la Función: findAllUsers
 *    Funcionamiento: Obtiene todas las entradas que asocian un usuario a una rutina concreta.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAllUsers = (req, res) => {
    
    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente
    Usuario_has_Rutina.findAll({
        // Empleamos where para filtrar por id de rutina
        where: {
            rutina_id: req.params.rutina_id
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los rutina."
              
        });
    });
};


/* --------------------------
 *    Nombre de la Función: update
 *    Funcionamiento: Actualiza una entrada en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.update = (req,res) => {
    // Obtenemos la información facilitada por el usuario en la petición
    const usuario_email = req.params.usuario_email;
    const rutina_id = req.params.rutina_id;

    // Ejecutamos el método update definido en el modelo de la bbdd correspondiente
    Usuario_has_Rutina.update(req.body, {
        // Usando where filtramos por email de usuario e id de rutina
        where: {
            usuario_email: usuario_email,
            rutina_id: rutina_id,
        },
    })
    .then(num => {
        // Tratamos la respuesta recibida
        if(num == 1){
            res.send({
                message: "Se ha actualizado correctamente el registro."
            });
        } else {
            res.send({
                message: "No se ha podido actualizar el registro.",
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar el registro.", err
        });
    });
};


/* --------------------------
 *    Nombre de la Función: delete
 *    Funcionamiento: Elimina una entrada en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.delete = (req, res) => {
    // Obtenemos la información facilitada por el usuario.
    const usuario_email = req.params.usuario_email;
    const rutina_id = req.params.rutina_id;

    // Ejecutamos el método destroy definido en el método de la bbdd correspondiente.
    Usuario_has_Rutina.destroy({
        // Empleamos where para filtrar por email e id de rutina
        where: { 
            usuario_email: usuario_email,
            rutina_id: rutina_id 
        },
    })
    .then( num => {
        // Tratamos la respuesta recibida
        if(num==1){
            res.send({
                message: "Se ha eliminado correctamente el rutina."
              });
        } else {
            res.send({
                message: "No se puede eliminar el rutina. Quizá no se encontró o el cuerpo de la petición está vacío."
              });
        }
    })
    .catch( err => {
        res.send({
            message: "No se ha podido eliminar el rutina con ej_id= " + EJERCICIO_ej_id
          });
    });
};


/* --------------------------
 *    Nombre de la Función: deleteAllRoutines
 *    Funcionamiento: Elimina todas las rutinas de un usuario en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteAllRoutines = (req, res) => {
    // Ejecutamos el método destroy definido en el modelo de la bbdd
    Usuario_has_Rutina.destroy({
        // Empleamos where para filtrar por email de usuario
        where: {
            usuario_email: req.params.usuario_email
        },
        // Truncate a false para no eliminar la tabla si queda vacía
        truncate: false
    })
    .then(nums => {
        // Tratamos la respuesta recibida
        res.send({ message: `${nums} rutina han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los rutina."
          });
    });
};


/* --------------------------
 *    Nombre de la Función: deleteFromAllUsers
 *    Funcionamiento: Elimina una rutina de todos los usuarios en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteFromAllUsers = (req, res) => {
    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente.
    Usuario_has_Rutina.destroy({
        // Usamos where para filtrar por id de rutina
        where: {
            rutina_id: req.params.rutina_id
        },
        // Truncate a false para no borrar la tabla si queda vacía.
        truncate: false
    })
    .then(nums => {
        // Tratamos la respuesta recibida
        res.send({ message: `${nums} rutina han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los rutina."
          });
    });
};


/* --------------------------
 *    Nombre de la Función: deleteAll
 *    Funcionamiento: Vacía la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteAll = (req, res) => {
    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente.
    Usuario_has_Rutina.destroy({
        // Where vacío para no filtrar
        where: {},
        // Truncate a false para no borrar la tabla tras el vaciado
        truncate: false
    })
    .then(nums => {
        // Tratamos la respuesta recibida
        res.send({ message: `${nums} rutina han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los rutina."
          });
    });
};