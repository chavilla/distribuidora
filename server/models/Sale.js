const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Car=require('./Car')

class Sale extends Model{}

Sale.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    products: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
        type: DataTypes.STRING,
        allowNull:false,
      },

    total: {
      type: DataTypes.FLOAT(10, 2),
      defaultValue: 0,
    }
  },
  {
    sequelize,
    modelName:'sale'
  });

 /*  Product.hasMany(Car,{
      primaryKey:'productId'
  }) */

module.exports = Sale;
