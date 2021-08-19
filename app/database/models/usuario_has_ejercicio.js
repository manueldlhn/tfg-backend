/* ---------------------------
 *    Nombre del fichero: usuario_has_ejercicio.js
 *    Descripción: Fichero del modelo de la tabla usuario_has_ejercicio
 *    Contenido: Función que define el modelo de la tabla, tal y como se define en la bbdd.        
 * ---------------------------  
 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_has_ejercicio', {
    usuario_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'Email'
      }
    },
    ejercicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ejercicio',
        key: 'ej_id'
      }
    },
    especialista_email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Comentarios: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuario_has_ejercicio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario_email" },
          { name: "ejercicio_id" },
        ]
      },
      {
        name: "ejercicio_id",
        using: "BTREE",
        fields: [
          { name: "ejercicio_id" },
        ]
      },
      {
        name: "usuario_has_ejercicio_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "usuario_email" },
        ]
      },
    ]
  });
};
