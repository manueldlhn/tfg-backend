/* ---------------------------
 *    Nombre del fichero: ejercicio.js
 *    Descripción: Fichero del modelo de la tabla ejercicio
 *    Contenido: Función que define el modelo de la tabla, tal y como se define en la bbdd.        
 * ---------------------------  
 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ejercicio', {
    ej_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Subtitulo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    Estado_forma: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Ubicacion: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Podometro: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Video: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    USUARIOS_Email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'Email'
      }
    }
  }, {
    sequelize,
    tableName: 'ejercicio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ej_id" },
        ]
      },
      {
        name: "fk_USUARIOS_Email",
        using: "BTREE",
        fields: [
          { name: "USUARIOS_Email" },
        ]
      },
    ]
  });
};
