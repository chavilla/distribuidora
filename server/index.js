const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const db=require('./config/database');

//Body parser
app.use(bodyparser.urlencoded({extended:true}));

//Routes
app.use('/api/users/', require('./routes/users'));

//databse
db.authenticate()
.then(()=>{ console.log('Conectado a la base de datos');
})
.catch(error=> console.log(error)
);

//Port 4000
const port= process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('Conectado al puerto ', port);
    
})