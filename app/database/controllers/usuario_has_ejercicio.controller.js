/* ---------------------------
 *    Nombre del fichero: ejercicio_has_rutina.controller.js
 *    Descripción: Fichero que recoge el controlador de ejercicio_has_rutina.
 *    Contenido: Funciones de la API Rest para controlar la tabla correspondiente de la bbdd:
 *      - create
 *      - findAllWorkouts
 *      - findAllUsers
 *      - update
 *      - delete
 *      - deleteAllWorkouts
 *      - deleteFromAllUsers
 *      - deleteAll       
 * ---------------------------  
 */

const { Rol } = require("../../authentication/config/Rol");
const {db} = require("../database");

const Usuario_has_Ejercicio = db.usuario_has_ejercicio;
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
    // Si la petición no tiene toda la información necesaria, da error
    if (!req.body.usuario_email || !req.body.ejercicio_id) {
        res.status(400).send({
          message: "No se puede crear un ejercicio vacío."
        });
        return;
    } 

    // Extracción de la información enviada por el usuario
    const user_workout = {
        usuario_email: req.body.usuario_email,
        ejercicio_id: req.body.ejercicio_id,
        especialista_email: req.body.especialista_email,
        Comentarios: req.body.Comentarios        
    };

    // Ejecución del método create definido en el modelo de la bbdd correspondiente
    Usuario_has_Ejercicio.create(user_workout)
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
 *    Nombre de la Función: findAllWorkouts
 *    Funcionamiento: Obtiene todas las entradas que asocian ejercicios a un usuario concreto.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAllWorkouts = (req, res) => {
    const offset = req.query.offset;
    const user = req.user;


    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente.
    Usuario_has_Ejercicio.findAll({
        // Include para incorporar a la petición información de la tabla Ejercicio
        include:{
            model: Ejercicio,
            as: 'ejercicio',
            attributes: user.Rol == Rol.Especialista && ["Nombre"],
        },
        // Where para filtrar por usuario
        where: {
            usuario_email: req.params.usuario_email
        },
        offset: offset ? parseInt(offset) : 0,
        limit: offset ? 10 : 100, // Temporal, hay que jugar con el offset también
    })
    .then(data => {
        // Tratamos la respuesta para que cada elemento sea un único objeto
        var resData = [];
        data.forEach(item => {
            var workout = item.ejercicio.dataValues;
            workout.ejercicio_id = item.ejercicio_id;
            workout.Comentarios = item.Comentarios;
            workout.especialista_email = item.especialista_email;
            resData.push(workout);
        });
        res.send(resData);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los ejercicio."
        });
    });
};


/* --------------------------
 *    Nombre de la Función: findAllUsers
 *    Funcionamiento: Obtiene todas las entradas que asocian un usuario a un ejercicio concreto.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAllUsers = (req, res) => {
    
    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente
    Usuario_has_Ejercicio.findAll({
        // Empleamos where para filtrar por id de ejercicio
        where: {
            ejercicio_id: req.params.ejercicio_id
        }
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
    const ejercicio_id = req.params.ejercicio_id;
    
    // Ejecutamos el método update definido en el modelo de la bbdd correspondiente
    Usuario_has_Ejercicio.update(req.body, {
        // Usando where filtramos por email de usuario e id de ejercicio
        where: {
            usuario_email: usuario_email,
            ejercicio_id: ejercicio_id,
        }
    })
    .then(num => {
        // Tratamos la respuesta recibida.
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
    const ejercicio_id = req.params.ejercicio_id;

    // Ejecutamos el método destroy definido en el método de la bbdd correspondiente.
    Usuario_has_Ejercicio.destroy({
        // Empleamos where para filtrar por email e id de ejercicio.
        where: { 
            usuario_email: usuario_email,
            ejercicio_id: ejercicio_id 
        }
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
            message: "No se ha podido eliminar el ejercicio con ej_id= " + EJERCICIO_ej_id
          });
    });
};


/* --------------------------
 *    Nombre de la Función: deleteAllWorkouts
 *    Funcionamiento: Elimina todos los ejercicios de un usuario en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteAllWorkouts = (req, res) => {
    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente
    Usuario_has_Ejercicio.destroy({
        // Empleamos where para filtrar por email de usuario
        where: {
            usuario_email: req.params.usuario_email
        },
        // Truncate a false para no eliminar la tabla si queda vacía.
        truncate: false
    })
    .then(nums => {
        // Tratamos la respuesta recibida
        res.send({ message: `${nums} ejercicio han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los ejercicio."
          });
    });
};


/* --------------------------
 *    Nombre de la Función: deleteFromAllUsers
 *    Funcionamiento: Elimina un ejercicio de todos los usuarios en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteFromAllUsers = (req, res) => {
    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente.
    Usuario_has_Ejercicio.destroy({
        // Usamos where para filtrar por id de ejercicio
        where: {
            ejercicio_id: req.params.ejercicio_id
        },
        // Truncate a false para no borrar la tabla si queda vacía.
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
    Usuario_has_Ejercicio.destroy({
        // Where vacío para no filtrar
        where: {},
        // Truncate a false para no borrar la tabla tras el vaciado.
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