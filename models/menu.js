'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.belongsTo(models.Restaurant, {foreignKey:'RestoranId'})
      Menu.belongsToMany(models.Visitor, {
        through: models.Receipt
      })
    }
  };
  Menu.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'name cannot be empty'
        }
      }
    },
    detail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'detail cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty:{
          msg : 'price cannot be empty',
          min : {
            args: 10000,
            msg: 'Price minimum 10.000'
          }
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty:{
          msg : 'quantity cannot be empty'
        }
      }
    },
    available: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty:{
          msg : 'available cannot be empty'
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
    },
    RestoranId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};