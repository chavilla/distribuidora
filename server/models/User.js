const {Model, DataTypes}=require('sequelize');
const sequelize=require('../config/database');

class User extends Model{}

User.init({
    id:{
        primaryKey:true,
        allowNull:false,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:'user'
    }
},{
    sequelize,
    modelName:'user'
});

module.exports=User;