var DataTypes = require("sequelize").DataTypes;
var _ejercicio = require("./ejercicio");
var _ejercicio_has_rutina = require("./ejercicio_has_rutina");
var _rutina = require("./rutina");
var _usuario_has_ejercicio = require("./usuario_has_ejercicio");
var _usuario_has_rutina = require("./usuario_has_rutina");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var ejercicio = _ejercicio(sequelize, DataTypes);
  var ejercicio_has_rutina = _ejercicio_has_rutina(sequelize, DataTypes);
  var rutina = _rutina(sequelize, DataTypes);
  var usuario_has_ejercicio = _usuario_has_ejercicio(sequelize, DataTypes);
  var usuario_has_rutina = _usuario_has_rutina(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  ejercicio.belongsToMany(rutina, { through: ejercicio_has_rutina, foreignKey: "EJERCICIO_ej_id", otherKey: "RUTINA_rut_id" });
  ejercicio.belongsToMany(usuarios, { through: usuario_has_ejercicio, foreignKey: "ejercicio_id", otherKey: "usuario_email" });
  rutina.belongsToMany(ejercicio, { through: ejercicio_has_rutina, foreignKey: "RUTINA_rut_id", otherKey: "EJERCICIO_ej_id" });
  rutina.belongsToMany(usuarios, { through: usuario_has_rutina, foreignKey: "rutina_id", otherKey: "usuario_email" });
  usuarios.belongsToMany(ejercicio, { through: usuario_has_ejercicio, foreignKey: "usuario_email", otherKey: "ejercicio_id" });
  usuarios.belongsToMany(rutina, { through: usuario_has_rutina, foreignKey: "usuario_email", otherKey: "rutina_id" });
  ejercicio_has_rutina.belongsTo(ejercicio, { as: "EJERCICIO_ej", foreignKey: "EJERCICIO_ej_id"});
  ejercicio.hasMany(ejercicio_has_rutina, { as: "ejercicio_has_rutinas", foreignKey: "EJERCICIO_ej_id"});
  usuario_has_ejercicio.belongsTo(ejercicio, { as: "ejercicio", foreignKey: "ejercicio_id"});
  ejercicio.hasMany(usuario_has_ejercicio, { as: "usuario_has_ejercicios", foreignKey: "ejercicio_id"});
  ejercicio_has_rutina.belongsTo(rutina, { as: "RUTINA_rut", foreignKey: "RUTINA_rut_id"});
  rutina.hasMany(ejercicio_has_rutina, { as: "ejercicio_has_rutinas", foreignKey: "RUTINA_rut_id"});
  usuario_has_rutina.belongsTo(rutina, { as: "rutina", foreignKey: "rutina_id"});
  rutina.hasMany(usuario_has_rutina, { as: "usuario_has_rutinas", foreignKey: "rutina_id"});
  ejercicio.belongsTo(usuarios, { as: "RUTINA_USUARIOS_Email_usuario", foreignKey: "RUTINA_USUARIOS_Email"});
  usuarios.hasMany(ejercicio, { as: "ejercicio", foreignKey: "RUTINA_USUARIOS_Email"});
  ejercicio_has_rutina.belongsTo(usuarios, { as: "USUARIOS_Email_usuario", foreignKey: "USUARIOS_Email"});
  usuarios.hasMany(ejercicio_has_rutina, { as: "ejercicio_has_rutinas", foreignKey: "USUARIOS_Email"});
  rutina.belongsTo(usuarios, { as: "USUARIOS_Email_usuario", foreignKey: "USUARIOS_Email"});
  usuarios.hasMany(rutina, { as: "rutina", foreignKey: "USUARIOS_Email"});
  usuario_has_ejercicio.belongsTo(usuarios, { as: "usuario_email_usuario", foreignKey: "usuario_email"});
  usuarios.hasMany(usuario_has_ejercicio, { as: "usuario_has_ejercicios", foreignKey: "usuario_email"});
  usuario_has_rutina.belongsTo(usuarios, { as: "usuario_email_usuario", foreignKey: "usuario_email"});
  usuarios.hasMany(usuario_has_rutina, { as: "usuario_has_rutinas", foreignKey: "usuario_email"});

  return {
    ejercicio,
    ejercicio_has_rutina,
    rutina,
    usuario_has_ejercicio,
    usuario_has_rutina,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
