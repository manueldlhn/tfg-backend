const { Rol } = require("../../authentication/config/Rol");
const {db} = require("../database");

const Usuario_has_Ejercicio = db.usuario_has_ejercicio;
const Ejercicio = db.ejercicio;

exports.create = (req, res) => {
    if (!req.body.usuario_email || !req.body.ejercicio_id) {
        res.status(400).send({
          message: "No se puede crear un ejercicio vacío."
        });
        return;
    } 

    const user_workout = {
        usuario_email: req.body.usuario_email,
        ejercicio_id: req.body.ejercicio_id,
        especialista_email: req.body.especialista_email,
        Comentarios: req.body.Comentarios        
    }

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


exports.findAllWorkouts = (req, res) => {
    const offset = req.query.offset;
    const user = req.user;

    Usuario_has_Ejercicio.findAll({
        include: user.Rol == Rol.Usuario && {
            model: Ejercicio,
            as: 'ejercicio',
        },
        where: {
            usuario_email: req.params.usuario_email
        },
        offset: offset ? parseInt(offset) : 0,
        limit: offset ? 10 : 100, // Temporal, hay que jugar con el offset también
    })
    .then(data => {
        if(user.Rol == Rol.Usuario){
            var workoutsData = [];
            data.forEach(item => {
                var workout = item.dataValues.ejercicio.dataValues;
                workout.Comentarios = item.dataValues.Comentarios;
                workout.especialista_email = item.dataValues.especialista_email;
                workoutsData.push(workout);
            });
            res.send(workoutsData);
        }else{
            res.send(data);
        }
            
        
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los ejercicio."
        });
    });
};


exports.findAllUsers = (req, res) => {
    
    Usuario_has_Ejercicio.findAll({
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

exports.update = (req,res) => {
    const usuario_email = req.params.usuario_email;
    const ejercicio_id = req.params.ejercicio_id;
    
    Usuario_has_Ejercicio.update(req.body, {
        where: {
            usuario_email: usuario_email,
            ejercicio_id: ejercicio_id,
        }
    })
    .then(num => {
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

exports.delete = (req, res) => {
    const usuario_email = req.params.usuario_email;
    const ejercicio_id = req.params.ejercicio_id;

    Usuario_has_Ejercicio.destroy({
        where: { 
            usuario_email: usuario_email,
            ejercicio_id: ejercicio_id 
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


exports.deleteAllWorkouts = (req, res) => {
    Usuario_has_Ejercicio.destroy({
        where: {
            usuario_email: req.params.usuario_email
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


exports.deleteFromAllUsers = (req, res) => {
    Usuario_has_Ejercicio.destroy({
        where: {
            ejercicio_id: req.params.ejercicio_id
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
    Usuario_has_Ejercicio.destroy({
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