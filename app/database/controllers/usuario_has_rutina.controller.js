const { Rol } = require("../../authentication/config/Rol");
const {db} = require("../database");

const Usuario_has_Rutina = db.usuario_has_rutina;
const Rutina = db.rutina;


exports.create = (req, res) => {
    if (!req.body.usuario_email || !req.body.rutina_id) {
        res.status(400).send({
          message: "No se puede crear un rutina vacío."
        });
        return;
    } 

    const user_routine = {
        usuario_email: req.body.usuario_email,
        rutina_id: req.body.rutina_id,
        especialista_email: req.body.especialista_email,
        Comentarios: req.body.Comentarios,      
    }

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


exports.findAllRoutines = (req, res) => {
    const user = req.user;

    Usuario_has_Rutina.findAll({
        include: {
            model: Rutina,
            as: 'rutina',
            attributes: user.Rol == Rol.Especialista && ["Nombre"],
        },
        where: {
            usuario_email: req.params.usuario_email
        }
    })
    .then(data => {
        var resData = [];
        data.forEach(item => {
            var routine = item.rutina.dataValues;
            routine.rutina_id = item.rutina_id;
            routine.Comentarios = item.Comentarios;
            routine.especialista_email = item.especialista_email;
            resData.push(routine);
        });
        console.log(resData);
        res.send(resData);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los rutina."
        });
    });
};


exports.findAllUsers = (req, res) => {
    
    Usuario_has_Rutina.findAll({
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


exports.update = (req,res) => {
    const usuario_email = req.params.usuario_email;
    const rutina_id = req.params.rutina_id;

    Usuario_has_Rutina.update(req.body, {
        where: {
            usuario_email: usuario_email,
            rutina_id: rutina_id,
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
}

exports.delete = (req, res) => {
    const usuario_email = req.params.usuario_email;
    const rutina_id = req.params.rutina_id;

    Usuario_has_Rutina.destroy({
        where: { 
            usuario_email: usuario_email,
            rutina_id: rutina_id 
        }
    })
    .then( num => {
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


exports.deleteAllRoutines = (req, res) => {
    Usuario_has_Rutina.destroy({
        where: {
            usuario_email: req.params.usuario_email
        },
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} rutina han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los rutina."
          });
    });
};


exports.deleteFromAllUsers = (req, res) => {
    Usuario_has_Rutina.destroy({
        where: {
            rutina_id: req.params.rutina_id
        },
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} rutina han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los rutina."
          });
    });
};


exports.deleteAll = (req, res) => {
    Usuario_has_Rutina.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} rutina han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los rutina."
          });
    });
};