const jwt=require('jsonwebtoken');
const User=require('../models/User');

module.exports=async (req,res,next)=>{

    //Read the token
    const token=req.header('x-auth-token');

    //verify token
    if (!token) {
        return res.status(401).json({ msg: 'Token no válido.'});
    }

    //Validate the token
    try {
        
        const encryption=await jwt.verify(token,process.env.SECRETA);
        if (!encryption) {
            return res.status(401).json({ msg: 'Token no válido.'});
        }
        const user=await User.findOne({where:{ id: encryption.id }});

        if (user.dataValues.role!=='admin'){
            res.status(400).json({msg:'No Tienes permiso para esta acción'});
        }
        
        next();
    } catch (error) {
        console.log('Error ', error);
        
    }
}