/* ---------------------------
 *    Nombre del fichero: historial_usuarios.controller.js
 *    Descripción: Fichero que recoge el controlador de historial_usuarios.
 *    Contenido: Funciones de la API Rest para controlar la tabla correspondiente de la bbdd:
 *      - create
 *      - findAll
 *      - findAllFromUser
 *      - deleteAll       
 * ---------------------------  
 */


const {db} = require("../database");

const Historial_Usuarios = db.historial_usuarios;
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

exports.create = (req,res) => {
    // Comprobación de que el cuerpo de la petición no está incompleto
    if (!req.body.USUARIOS_Email || !req.body.EJERCICIO_ej_id || !req.body.Fecha_Hora){
        res.status(400).send({
            message: "No se puede crear una nueva entrada en el historial sin Email, ID Ejercicio o Fecha y hora.",
        });
        return;       
    }
    // Extraemos la información de la petición
    const record = {
        USUARIOS_Email: req.body.USUARIOS_Email,
        EJERCICIO_ej_id: req.body.EJERCICIO_ej_id,
        RUTINA_rut_id: req.body.RUTINA_rut_id,
        Fecha_Hora: req.body.Fecha_Hora,
        Tiempo_ejercicio: req.body.Tiempo_ejercicio,
        Info_Adicional: req.body.Info_Adicional,
    };

    // Ejecutamos el método create definido en el modelo de la bbdd correspondiente
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

exports.findAll = (req, res) => {
    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente.
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


/* --------------------------
 *    Nombre de la Función: findAllFromUser
 *    Funcionamiento: Obtiene todos los registros de un usuario concreto.
 *    Argumentos que recibe: 
 *          - req: Request (Petición). Objeto con información de la petición enviada por
 *                 el usuario.
 *          - res: Response (Respuesta). Objeto con información de la respuesta que se enviará.
 *    Devuelve: Nada (void).
 * --------------------------
 */

exports.findAllFromUser = (req, res) => {
    const offset = req.query.offset;

    // Ejecutamos el método findAll definido en el modelo de la bbdd correspondiente
    Historial_Usuarios.findAll({
        // Usando include se añade el nombre del ejercicio y la rutina del registro
        include: [{
            model: Ejercicio,
            as: "EJERCICIO_ej",
            attributes: ["Nombre"],
        },{
            model: Rutina,
            as: "RUTINA_rut",
            attributes: ["Nombre"],

        }],
        // Empleamos where para filtrar por el usuario
        where: {
            USUARIOS_Email: req.params.USUARIOS_Email
        },
        // Ordenamos por fecha los resultados
        order: [ ['Fecha_Hora', 'DESC'], ['EJERCICIO_ej_id', 'ASC']],
        offset: parseInt(offset),
        limit: 10,
    })
    .then(data => {
        // Tratamos la información recibida para que cada elemento sea un objeto en el array
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

exports.deleteAll = (req,res) => {
    // Ejecutamos el método destroy definido en el modelo de la bbdd correspondiente
    Historial_Usuarios.destroy({
        // Where vacío para no filtrar
        where: {},
        // Truncate a false para no borrar la tabla cuando quede vacía
        truncate: false,
    })
    .then(nums => {
        // Tratamos la información de la respuesta recibida.
        res.send({ message: `${nums} registros han sido borrados.` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha habido algún error al eliminar todos los registros.",
        });
    });
};

