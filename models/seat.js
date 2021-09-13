'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seat.belongsTo(models.Restaurant, {foreignKey:'RestoranId'})
      Seat.belongsTo(models.Visitor, {foreignKey:'VisitorId'})
    }
  };
  Seat.init({
    no_meja: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    RestoranId: DataTypes.INTEGER,
    VisitorId: DataTypes.INTEGER
  }, {
    hooks:{
      afterFind(seats){
        if (seats.length > 0){
          seats.forEach(seat => {
            seat.status ? seat.status = 'terisi' : seat.status = 'kosong'
          })
        }
      },
      beforeCreate(seats){
        seats.status = false
      }
    },
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};