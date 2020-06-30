const express=require('express');
const {check }=require('express-validator');
const userController=require('../../controllers/userController');
const router=express.Router();
const authAdmin=require('../../middleware/auth');

router.post('/',
[
    check('name','El nombre es campo requerido').not().isEmpty(),
    check('email','El email no es válido').isEmail(),
    check('password','La contraseña Debe tener al menos 8 caracteres').isLength({min:8})
],
authAdmin,
userController.addUser
);




module.exports=router;