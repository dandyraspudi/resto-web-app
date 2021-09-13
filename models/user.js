'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'name cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Password cannot be empty'
        }
      }
    },
    role: DataTypes.STRING,
    RestoranId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg : 'Choose Restoran'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(instance){
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};