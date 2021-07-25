const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rutina', {
    rut_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    Info_Rutina: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    USUARIOS_Email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'Email'
      }
    }
  }, {
    sequelize,
    tableName: 'rutina',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rut_id" },
          { name: "USUARIOS_Email" },
        ]
      },
      {
        name: "fk_RUTINA_USUARIOS1",
        using: "BTREE",
        fields: [
          { name: "USUARIOS_Email" },
        ]
      },
    ]
  });
};
