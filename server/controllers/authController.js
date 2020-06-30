const User=require('../models/User');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const authController={
    loginUser:async (req,res)=>{
        const { email, password }=req.body;
        
        try {
            //Verify by email
            const user=await User.findOne({ where:{ email}});
            if (!user){
                res.status(400).json({msg: 'Usuario o constraseña no válida'});
            }            

            //verify by password
            const password_right=await bcryptjs.compare(password, user.dataValues.password);
            if (!password_right) {
                res.status(400).json({msg: 'Usuario o constraseña no válida'});
            }

            //jwt
            const payload={
                id:user.dataValues.id
              }
              //Sign the token
              jwt.sign(payload,process.env.SECRETA,{
                expiresIn:3600
              },(error,token)=>{
                if (error) throw error;
                //Msg
                res.json({token});
              });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'Hubo un problema en el sevidor'});
        }

    }
}

module.exports=authController;