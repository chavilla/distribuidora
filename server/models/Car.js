const {Model, DataTypes}=require('sequelize');
const sequelize=require('../config/database');
const Product=require('./Product');
const User=require('./User');

class Car extends Model{}

Car.init({
    id:{
        primaryKey:true,
        allowNull:false,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1
    }
},{
   sequelize,
   modelName: 'car'
});

/* Car.belongsTo(Product,{
    primaryKey:'productId'
}); */

// Car.associate=(model)=>{
//     Car.hasMany(model.Product,{
//         OnDelete:'CASCADE'
//     })
// }

/* Car.hasMany(Product,{
    primaryKey:'productId'
}) */



module.exports=Car;