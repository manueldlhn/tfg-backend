const {db} = require("../database");
const bcrypt = require('bcrypt');

const Usuarios = db.usuarios;


exports.create = (req, res) => {
    if (!req.body.Email) {
        res.status(400).send({
          message: "No se puede crear un usuario vacío.",
        });
        return;
    } 

    const usuario = {
        Email: req.body.Email,
        Password: req.body.Password,
        Nombre: req.body.Nombre,
        Fecha_Nacimiento: req.body.Fecha_Nacimiento,
        Enabled: req.body.Enabled ? req.body.Enabled : false,
        Telefono: req.body.Telefono,
        Rol: req.body.Rol,
    }

    Usuarios.create(usuario)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al crear el Usuario.",
          });
    });
};





exports.findAll = (req, res) => {
    const offset = req.query.offset;
    Usuarios.findAll({
        offset: parseInt(offset),
        limit: 10,
    })
    .then(data => {
        
        // Eliminamos toda referencia a la contraseña antes de devolver los datos.
        data.forEach( (object,i) => {            
            delete object.dataValues.Password;
            delete object._previousDataValues.Password;
            object._options.attributes.splice(1,1);
            
        });


        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido un error al extraer los usuarios."
        });
    });
};


exports.findOne = (req, res) => {
    const email = req.params.email;

    Usuarios.findByPk(email)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al obtener usuario con email= " + email
          });
    });
};





exports.update = (req, res) => {
    const email = req.params.email;

    if(req.body.Password != undefined) req.body.Password = bcrypt.hashSync(req.body.Password, 10);

    Usuarios.update(req.body,{
        where: { Email: email }
    })
    .then(num => {
        if(num==1){
            res.send({
                ok: true,
                message: "Se ha actualizado correctamente el usuario."
              });
        } else {
            res.send({
                ok: false,
                message: `No se puede actualizar el usuario con email=${email}`
              });
        }
    })
    .catch(err => {
        res.status(500).send({
            ok: false,
            message: "Error al actualizar usuario con email= " + email
          });
    });
};





exports.delete = (req, res) => {
    const email = req.params.email;

    Usuarios.destroy({
        where: { Email: email }
    })
    .then( num => {
        if(num==1){
            res.send({
                message: "Se ha eliminado correctamente el usuario."
              });
        } else {
            res.send({
                message: "No se puede eliminar el usuario. Quizá no se encontró o el cuerpo de la petición está vacío."
              });
        }
    })
    .catch( err => {
        res.send({
            message: "No se ha podido eliminar el usuario con email= " + email
          });
    });
};





exports.deleteAll = (req, res) => {
    Usuarios.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} usuarios han sido eliminados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha habido algún error al eliminar los usuarios."
          });
    });
};
