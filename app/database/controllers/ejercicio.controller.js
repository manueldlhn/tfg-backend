const { Rol } = require("../../authentication/config/Rol");
const {sequelize, db} = require("../database");

const Ejercicio = db.ejercicio;


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "No se puede crear un ejercicio vacío."
        });
        return;
    } 

    const ejercicio = {
        Nombre: req.body.Nombre,
        Subtitulo: req.body.Subtitulo,
        Descripcion: req.body.Descripcion,
        Estado_forma: req.body.Estado_forma,
        Ubicacion: req.body.Ubicacion,
        Podometro: req.body.Podometro,
        RUTINA_USUARIOS_Email: req.body.RUTINA_USUARIOS_Email  
    }

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





exports.findAll = (req, res) => {
    const offset = req.query.offset;
    const user = req.user; 

    const subQuery = sequelize.dialect.queryGenerator.selectQuery('usuario_has_ejercicio', {
        attributes: ['ejercicio_id'],
        where: {
            usuario_email: user.Email,
        }
    })
    .slice(0,-1); // Elimina el ;

    Ejercicio.findAll({
        where: 
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




exports.findOne = (req, res) => {
    const ej_id = req.params.ej_id;

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





exports.update = (req, res) => {
    const ej_id = req.params.ej_id;

    Ejercicio.update(req.body,{
        where: { ej_id: ej_id }
    })
    .then(num => {
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





exports.delete = (req, res) => {
    const ej_id = req.params.ej_id;

    Ejercicio.destroy({
        where: { ej_id: ej_id }
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
            message: "No se ha podido eliminar el ejercicio con ej_id= " + ej_id
          });
    });
};





exports.deleteAll = (req, res) => {
    Ejercicio.destroy({
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
