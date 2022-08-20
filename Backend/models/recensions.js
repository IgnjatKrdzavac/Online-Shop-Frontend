'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recensions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Products,Users}) {
      this.belongsTo(Products, {foreignKey: 'productId', as: 'product'}); 
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'}); 
    }
  }
  recensions.init({
    recension: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recensions',
  });
  return recensions;
};