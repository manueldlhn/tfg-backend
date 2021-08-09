/* ---------------------------
 *    Nombre del fichero: ejercicio_has_rutina.controller.js
 *    Descripción: Fichero que recoge el controlador de ejercicio_has_rutina.
 *    Contenido: Funciones de la API Rest para controlar la tabla correspondiente de la bbdd:
 *      - create
 *      - findAll
 *      - findAllRoutines
 *      - findAllWorkouts
 *      - update
 *      - delete
 *      - deleteFromAllRoutines
 *      - deleteAllWorkouts
 *      - deleteAll       
 * ---------------------------  
 */

const {db} = require("../database");

// Importamos los modelos que se van a utilizar en las funciones

const Ejercicio_has_Rutina = db.ejercicio_has_rutina;
const Ejercicio = db.ejercicio;
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

    // Si la petición no tiene la información necesaria, da error.
    if (!req.body.EJERCICIO_ej_id || !req.body.RUTINA_rut_id) {
        res.status(400).send({
          message: "No se puede crear una asociación sin identificadores válidos."
        });
        return;
    } 

    // Extracción de la información enviada por el usuario
    const workout_routine = {
        EJERCICIO_ej_id: req.body.EJERCICIO_ej_id, 
        RUTINA_rut_id: req.body.RUTINA_rut_id,
        Comentarios: req.body.Comentarios,
        USUARIOS_Email: req.body.USUARIOS_Email        
    };

    // Ejecución del método create definido en los modelos de la bbdd
    Ejercicio_has_Rutina.create(workout_routine)
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

exports.findAll = (req,res) => {

    // Offset utilizado para no entregar todos los elementos en una única petición.
    const offset = req.query.offset;

    // Ejecución del método findAll definido en los modelos de la bbdd.
    Ejercicio_has_Rutina.findAll({
        // Añadimos los nombres de ejercicio y rutina empleando "include"
        include: [{
            model: Ejercicio,
            as: "EJERCICIO_ej",
            attributes: ["Nombre"],
        },{
            model: Rutina,
            as: "RUTINA_rut",
            attributes: ["Nombre"],
        }],
        offset: parseInt(offset),
        limit: 10,
    })
    .then(data => {
        // Reestructuramos la respuesta de la bbdd para que cada elemento constituya un único objeto.
        var resData = [];
        data.forEach(element => {
            var resElement = {
                EJERCICIO_ej_id: element.EJERCICIO_ej_id,
                EJERCICIO_Nombre: element.EJERCICIO_ej.Nombre,
                RUTINA_rut_id: element.RUTINA_rut_id,
                RUTINA_Nombre: element.RUTINA_rut.Nombre,
                Comentarios: element.Comentarios,
                USUARIOS_Email: element.USUARIOS_Email,
            };
            resData.push(resElement);
        });
        res.send(resData);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer las asociaciones."
        });
    });
}


/* --------------------------
 *    Nombre de la Función: findAllRoutines
 *    Funcionamiento: Obtiene todas las entradas que asocian rutinas a un ejercicio concreto.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAllRoutines = (req, res) => {
    
    // Ejecutamos el método findAll definido en los modelos de la bbdd
    Ejercicio_has_Rutina.findAll({
        // Empleamos la cláusula where para filtrar por id de ejercicio
        where: {
            EJERCICIO_ej_id: req.params.EJERCICIO_ej_id
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
 *    Nombre de la Función: findAllWorkouts
 *    Funcionamiento: Obtiene todas las entradas que asocian ejercicios a una rutina concreta.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAllWorkouts = (req, res) => {
    const offset = req.query.offset;

    // Ejecutamos el método findAll definido en los modelos de la bbdd.
    Ejercicio_has_Rutina.findAll({
        // Empleando include incorporamos toda la información referida a los ejercicios de la rutina.
        include: {
            model: Ejercicio,
            as: 'EJERCICIO_ej'
        },
        // Utilizando where, filtramos por id de rutina concreta, enviada como parámetro.
        where: {
            RUTINA_rut_id: req.params.RUTINA_rut_id
        },
        offset: parseInt(offset),
        limit: 10,
    })
    .then(data => {
        // Reestructuramos los datos recibidos por sequelize para que cada elemento sea un único objeto.
        var workoutsData = [];
        data.forEach(item => {
            var workout = item.dataValues.EJERCICIO_ej.dataValues;
            workout.Comentarios = item.dataValues.Comentarios;
            workout.especialista_email = item.dataValues.USUARIOS_Email;
            workoutsData.push(workout);
        });
        res.send(workoutsData);  
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

exports.update = (req, res) => {

    // Parámetros enviados por el usuario
    const EJERCICIO_ej_id = req.params.EJERCICIO_ej_id;
    const RUTINA_rut_id = req.params.RUTINA_rut_id;

    // Ejecutamos el método update definido en los modelos de la bbdd
    Ejercicio_has_Rutina.update(req.body,{
        // Utilizando where se filtra por id de ejercicio y de rutina
        where: { 
            EJERCICIO_ej_id: EJERCICIO_ej_id,
            RUTINA_rut_id: RUTINA_rut_id 
        }
    })
    .then(num => {
        // Tratamos la respuesta.
        if(num==1){
            res.send({
                message: "Se ha actualizado correctamente el ejercicio."
              });
        } else {
            res.send({
                message: `No se puede actualizar el ejercicio con ej_id=${EJERCICIO_ej_id}`
              });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar ejercicio con ej_id= " + EJERCICIO_ej_id
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

    // Parámetros enviados por el usuario
    const EJERCICIO_ej_id = req.params.EJERCICIO_ej_id;
    const RUTINA_rut_id = req.params.RUTINA_rut_id;

    // Ejecutamos el método destroy definido en los modelos de la bbdd
    Ejercicio_has_Rutina.destroy({
        // Usando where filtramos por id de ejercicio y rutina concretos
        where: { 
            EJERCICIO_ej_id: EJERCICIO_ej_id,
            RUTINA_rut_id: RUTINA_rut_id 
        }
    })
    .then( num => {
        // Tratamos la respuesta
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
 *    Nombre de la Función: deleteFromAllRoutines
 *    Funcionamiento: Elimina un ejercicio de todas las rutinas en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteFromAllRoutines = (req, res) => {
    // Ejecutamos el método destroy definido en los modelos de la bbdd
    Ejercicio_has_Rutina.destroy({
        // Empleamos where para filtrar por el id de ejercicio concreto
        where: {
            EJERCICIO_ej_id: req.params.EJERCICIO_ej_id
        },
        // Truncate a false para que si la tabla queda vacía no se elimine tras el borrado de información
        truncate: false
    })
    .then(nums => {
        // Se trata la respuesta recibida
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
 *    Nombre de la Función: deleteAllWorkouts
 *    Funcionamiento: Elimina todos los ejercicios de una rutina en la tabla.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.deleteAllWorkouts = (req, res) => {
    // Ejecutamos el método destroy definido en los modelos de la bbdd
    Ejercicio_has_Rutina.destroy({
        // Usando where filtramos por id de rutina
        where: {
            RUTINA_rut_id: req.params.RUTINA_rut_id
        },
        // Truncate a false para que la tabla no se elimine si queda vacía tras el borrado
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
    // Ejecutamos el método destroy definido en los modelos de la bbdd
    Ejercicio_has_Rutina.destroy({
        // Where vacío (todos los elementos)
        where: {},
        // Truncate a false para que no se elimine la tabla tras vaciarla
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
