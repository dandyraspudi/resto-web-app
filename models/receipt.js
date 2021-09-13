'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getStatus(){
      if(this.hasCooked){
        return 'Sudah Matang'
      } else {
        return 'Sedang Dimasak'
      }
    }
    static associate(models) {
      // define association here
    }
  };
  Receipt.init({
    hasCooked: DataTypes.BOOLEAN,
    VisitorId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(instance){
        instance.hasCooked = false
      }
    },
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};