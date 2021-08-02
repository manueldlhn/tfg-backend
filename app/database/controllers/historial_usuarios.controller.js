const {db} = require("../database");

const Historial_Usuarios = db.historial_usuarios;
const Ejercicio = db.ejercicio;
const Rutina = db.rutina;

exports.create = (req,res) => {
    if (!req.body.USUARIOS_Email || !req.body.EJERCICIO_ej_id || !req.body.Fecha_Hora){
        res.status(400).send({
            message: "No se puede crear una nueva entrada en el historial sin Email, ID Ejercicio o Fecha y hora.",
        });
        return;       
    }

    const record = {
        USUARIOS_Email: req.body.USUARIOS_Email,
        EJERCICIO_ej_id: req.body.EJERCICIO_ej_id,
        RUTINA_rut_id: req.body.RUTINA_rut_id,
        Fecha_Hora: req.body.Fecha_Hora,
        Tiempo_ejercicio: req.body.Tiempo_ejercicio,
        Info_Adicional: req.body.Info_Adicional,
    };

    Historial_Usuarios.create(record)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha habido un error al cargar el registro de actividad.",
        });
    });
};

exports.findAll = (req, res) => {
    Historial_Usuarios.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha habido un error al extraer los registros.",
        });
    });
};



exports.findAllFromUser = (req, res) => {
    const offset = req.query.offset;
    const user = req.user;

    Historial_Usuarios.findAll({
        include: [{
            model: Ejercicio,
            as: "EJERCICIO_ej",
            attributes: ["Nombre"],
        },{
            model: Rutina,
            as: "RUTINA_rut",
            attributes: ["Nombre"],

        }],
        where: {
            USUARIOS_Email: req.params.USUARIOS_Email
        },
        order: [ ['Fecha_Hora', 'DESC'], ['EJERCICIO_ej_id', 'ASC']],
        offset: parseInt(offset),
        limit: 10,
    })
    .then(data => {
        var resData = [];
        data.forEach(item => {
            var record = {
                USUARIOS_Email: item.USUARIOS_Email,
                EJERCICIO_ej_id: item.EJERCICIO_ej_id,
                EJERCICIO_Nombre: item.EJERCICIO_ej.Nombre,
                RUTINA_rut_id: item.RUTINA_rut_id,
                RUTINA_Nombre: item.RUTINA_rut_id == null ? null : item.RUTINA_rut.Nombre,
                Fecha_Hora: item.Fecha_Hora,
                Tiempo_ejercicio: item.Tiempo_ejercicio,
                Info_Adicional: item.Info_Adicional,
            };
            resData.push(record);
        });
        res.send(resData);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha habido un error al obtener los registros.",
        });
    });
};

exports.deleteAll = (req,res) => {
    Historial_Usuarios.destroy({
        where: {},
        truncate: false,
    })
    .then(nums => {
        res.send({ message: `${nums} registros han sido borrados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha habido algún error al eliminar todos los registros.",
        });
    });
};

