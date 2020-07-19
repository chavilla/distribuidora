const Sequelize=require('sequelize');
const db=require('../config/database');

const Product=db.define('products',{
    name:{
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    price:{
        type:Sequelize.FLOAT(10,2),
        defaultValue:0,
    },
    stock:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    state:{
        type:Sequelize.ENUM(['available','unavailable']),
        defaultValue:'available'
    },
    image:{
        type:Sequelize.STRING,
        defaultValue:null
    }
})

module.exports=Product;