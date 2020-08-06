const Car=require('./Car.js');
const User=require('./User.js');
const Product=require('./Product.js');

User.hasMany(Car);
Car.belongsTo(User,{foreignKey: 'userId'});