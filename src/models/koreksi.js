'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class koreksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      koreksi.belongsTo(models.user,{
        foreignKey:"user_id"
      });
      koreksi.belongsTo(models.in_out,{
        foreignKey:"in_out_id"
      });
      koreksi.belongsTo(models.status_koreksi,{
        foreignKey:"status_koreksi_id"
      });
    }
  }
  koreksi.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.INTEGER,
    in_out_id: DataTypes.BIGINT,
    keterangan: DataTypes.TEXT,
    status_koreksi_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'koreksi',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  });
  return koreksi;
};