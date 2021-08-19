/* ---------------------------
 *    Nombre del fichero: historial_usuarios.js
 *    Descripción: Fichero del modelo de la tabla historial_usuarios
 *    Contenido: Función que define el modelo de la tabla, tal y como se define en la bbdd.        
 * ---------------------------  
 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historial_usuarios', {
    USUARIOS_Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'Email'
      }
    },
    EJERCICIO_ej_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ejercicio',
        key: 'ej_id'
      }
    },
    RUTINA_rut_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rutina',
        key: 'rut_id'
      }
    },
    Fecha_Hora: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    Tiempo_ejercicio: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Info_Adicional: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'historial_usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USUARIOS_Email" },
          { name: "EJERCICIO_ej_id" },
          { name: "Fecha_Hora" },
        ]
      },
      {
        name: "historial_usuarios_fk_email",
        using: "BTREE",
        fields: [
          { name: "USUARIOS_Email" },
        ]
      },
      {
        name: "historial_usuarios_fk_ejercicio",
        using: "BTREE",
        fields: [
          { name: "EJERCICIO_ej_id" },
        ]
      },
      {
        name: "historial_usuarios_ibfk_3",
        using: "BTREE",
        fields: [
          { name: "RUTINA_rut_id" },
        ]
      },
    ]
  });
};
