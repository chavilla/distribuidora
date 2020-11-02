const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Car=require('./Car')

class Product extends Model{}

Product.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    category: {
      type: DataTypes.ENUM(["Juguetes", "Hogar", "Ropa"]),
      allowNull:false
    },

    state: {
      type: DataTypes.ENUM(["available", "unavailable"]),
      defaultValue: "available",
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null,
    }
  },
  {
    sequelize,
    modelName:'product'
  });

 /*  Product.hasMany(Car,{
      primaryKey:'productId'
  }) */

module.exports = Product;
