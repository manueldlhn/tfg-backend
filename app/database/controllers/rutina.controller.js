const { Rol } = require("../../authentication/config/Rol");
const {sequelize, db} = require("../database");

const Rutina = db.rutina;


exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
          message: "No se puede crear una rutina vacía."
        });
        return;
    } 

    const rutina = {
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
        Info_Rutina: req.body.Info_Rutina,
        Pub_priv: req.body.Pub_priv,
        USUARIOS_Email: req.body.USUARIOS_Email
    }

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





exports.findAll = (req, res) => {
    const offset = req.query.offset;
    const user = req.user;

    const subQuery = sequelize.dialect.queryGenerator.selectQuery('usuario_has_rutina', {
        attributes: ['rutina_id'],
        where: {
            usuario_email: user.Email,
        }
    })
    .slice(0,-1); // Elimina el ;

    Rutina.findAll({
        where: 
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




exports.findOne = (req, res) => {
    const rut_id = req.params.rut_id;

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





exports.update = (req, res) => {
    const rut_id = req.params.rut_id;

    Rutina.update(req.body, {
        where: { rut_id: rut_id }
    })
    .then(num => {
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





exports.delete = (req, res) => {
    const rut_id = req.params.rut_id;

    Rutina.destroy({
        where: { rut_id: rut_id }
    })
    .then( num => {
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





exports.deleteAll = (req, res) => {
    Rutina.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} rutinas han sido eliminadas.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar las rutinas."
          });
    });
};
