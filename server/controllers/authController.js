const User=require('../models/User');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const authController={
    loginUser:async (req,res)=>{
        const { email, password }=req.body;
        
        try {
            //Verify by email
            let user=await User.findOne({ where:{ email}});

            if (user== null){
                return res.status(400).json({msg: 'Usuario o constraseña no válida'});
            }            

            //verify by password
            const password_right=await bcryptjs.compare(password, user.dataValues.password);
            if (!password_right) {
                return res.status(400).json({msg: 'Usuario o constraseña no válida'});
            }

            //jwt
            const payload={
                id:user.dataValues.id,
                name:user.dataValues.name,
                email:user.dataValues.email
              }
              //Sign the token
              jwt.sign(payload,process.env.SECRETA,{
                expiresIn:'4h'
              },(error,token)=>{
                if (error) throw error;
                //Msg
                res.json({token});
              });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'Hubo un problema en el sevidor de autenticación'});
        }
    },

    userAuthenticated:async (req,res)=>{
        
        res.json({user:req.user})
    
    }
}

module.exports=authController;