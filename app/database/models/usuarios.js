/* ---------------------------
 *    Nombre del fichero: usuarios.js
 *    Descripción: Fichero del modelo de la tabla usuarios
 *    Contenido: Función que define el modelo de la tabla, tal y como se define en la bbdd.        
 * ---------------------------  
 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    Email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    Password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Fecha_Nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Telefono: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: "Telefono"
    },
    Rol: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
      {
        name: "Telefono",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Telefono" },
        ]
      },
    ]
  });
};
