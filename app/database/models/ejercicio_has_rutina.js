const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ejercicio_has_rutina', {
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
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rutina',
        key: 'rut_id'
      }
    },
    Comentarios: {
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
    tableName: 'ejercicio_has_rutina',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EJERCICIO_ej_id" },
          { name: "RUTINA_rut_id" },
        ]
      },
      {
        name: "fk_EJERCICIO_has_RUTINA_RUTINA1",
        using: "BTREE",
        fields: [
          { name: "RUTINA_rut_id" },
        ]
      },
      {
        name: "fk_EJERCICIO_has_RUTINA_ESPECIALISTA",
        using: "BTREE",
        fields: [
          { name: "USUARIOS_Email" },
        ]
      },
    ]
  });
};
