const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const db=require('./config/database');
const cors=require('cors');
const sequelize=require('./config/database');

//Habilitar los cors
app.use(cors());

//Body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//Routes
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/products/', require('./routes/products'));
app.use('/api/car/', require('./routes/car'));

//databse
sequelize.sync({force:true})
.then(()=>{ console.log('Conectado a la base de datos');
})
.catch(error=> console.log(error)
);

//Port 4000
const port= process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('Conectado al puerto ', port);
    
})