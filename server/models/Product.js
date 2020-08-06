const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

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
    state: {
      type: DataTypes.ENUM(["available", "unavailable"]),
      defaultValue: "available",
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    car: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },{
      sequelize,
      modelName:'product'
  });

module.exports = Product;
