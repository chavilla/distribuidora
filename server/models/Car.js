const {Model, DataTypes}=require('sequelize');
const sequelize=require('../config/database');
const Product=require('./Product');
const User=require('./User');

class Car extends Model{}

Car.init({
    id:{
        primaryKey:true,
        allowNull:false,
        type:DataTypes.STRING
    },
    userId:{
        type:DataTypes.UUID
    },
    productId:{
        type: DataTypes.INTEGER
    }
},{
   sequelize,
   modelName: 'car'
});

module.exports=Car;