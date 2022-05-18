'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class holidaymaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  holidaymaster.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title : DataTypes.STRING,
    isActive : DataTypes.INTEGER,
    fromDate : DataTypes.DATE,
    toDate : DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    createdAt : DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'holidaymaster',
  });
  return holidaymaster;
};