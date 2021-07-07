const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_has_rutina', {
    usuario_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'Email'
      }
    },
    rutina_id: {
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
  }, {
    sequelize,
    tableName: 'usuario_has_rutina',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario_email" },
          { name: "rutina_id" },
        ]
      },
      {
        name: "usuario_has_rutina_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "rutina_id" },
        ]
      },
      {
        name: "usuario_email",
        using: "BTREE",
        fields: [
          { name: "usuario_email" },
        ]
      },
    ]
  });
};