const  {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/database');

class Car extends Model{}

Car.init({
    id:{
        primaryKey:true,
        allowNull:false,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1
    },
    productId:{
        type:DataTypes.INTEGER
    },
    userId:{
        type: DataTypes.UUID
    }
},{
    sequelize,
    modelName:'car'
});


module.exports=Car;