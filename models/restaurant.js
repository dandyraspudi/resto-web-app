'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.hasMany(models.Menu, {foreignKey:'RestoranId'})
      Restaurant.hasMany(models.Seat, {foreignKey:'RestoranId'})
    }
  };
  Restaurant.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'name cannot be empty'
        }
      }
    },
    alamat: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'alamat cannot be empty'
        }
      }
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg : 'image cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};