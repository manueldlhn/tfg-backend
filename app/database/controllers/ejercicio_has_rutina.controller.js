const {db} = require("../database");

const Ejercicio_has_Rutina = db.ejercicio_has_rutina;
const Ejercicio = db.ejercicio;


exports.create = (req, res) => {
    if (!req.body.EJERCICIO_ej_id || !req.body.RUTINA_rut_id) {
        res.status(400).send({
          message: "No se puede crear una asociación sin identificadores válidos."
        });
        return;
    } 

    const workout_routine = {
        EJERCICIO_ej_id: req.body.EJERCICIO_ej_id, 
        RUTINA_rut_id: req.body.RUTINA_rut_id,
        USUARIOS_Email: req.body.USUARIOS_Email        
    }

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


exports.findAllRoutines = (req, res) => {
    
    Ejercicio_has_Rutina.findAll({
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


exports.findAllWorkouts = (req, res) => {
    const offset = req.query.offset;
    Ejercicio_has_Rutina.findAll({
        include: {
            model: Ejercicio,
            as: 'EJERCICIO_ej'
        },
        where: {
            RUTINA_rut_id: req.params.RUTINA_rut_id
        },
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


exports.update = (req, res) => {
    const EJERCICIO_ej_id = req.params.EJERCICIO_ej_id;
    const RUTINA_rut_id = req.params.RUTINA_rut_id;

    Ejercicio_has_Rutina.update(req.body,{
        where: { 
            EJERCICIO_ej_id: EJERCICIO_ej_id,
            RUTINA_rut_id: RUTINA_rut_id 
        }
    })
    .then(num => {
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


exports.delete = (req, res) => {
    const EJERCICIO_ej_id = req.params.EJERCICIO_ej_id;
    const RUTINA_rut_id = req.params.RUTINA_rut_id;

    Ejercicio_has_Rutina.destroy({
        where: { 
            EJERCICIO_ej_id: EJERCICIO_ej_id,
            RUTINA_rut_id: RUTINA_rut_id 
        }
    })
    .then( num => {
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


exports.deleteFromAllRoutines = (req, res) => {
    Ejercicio_has_Rutina.destroy({
        where: {
            EJERCICIO_ej_id: req.params.EJERCICIO_ej_id
        },
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} ejercicio han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los ejercicio."
          });
    });
};


exports.deleteAllWorkouts = (req, res) => {
    Ejercicio_has_Rutina.destroy({
        where: {
            RUTINA_rut_id: req.params.RUTINA_rut_id
        },
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} ejercicio han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los ejercicio."
          });
    });
};


exports.deleteAll = (req, res) => {
    Ejercicio_has_Rutina.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} ejercicio han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los ejercicio."
          });
    });
};
