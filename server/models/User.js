const {Sequelize, DataTypes}=require('sequelize');
const db=require('../config/database');

const User=db.define('users',{
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
});

module.exports=User;