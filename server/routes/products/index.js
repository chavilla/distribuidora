const express=require('express');
const router=express.Router();
const productController=require('../../controllers/productController');
const multer=require('multer');
const path=require('path');
const { check }=require('express-validator');

//Subir la imagen
const storage=multer.diskStorage({
    destination: path.join(__dirname, '../public/'),
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

//middleware de subir la imagen
const upload=multer({
    storage,
    dest:path.join(__dirname, '../public')
}).single('image');


router.post('/',
[
    check('name','El nombre es un campo requerido').trim().not().isEmpty(),
    check('price','El precio debe ser numérico').isFloat(),
    check('stock','El stock debe ser numérico').isInt(),
],
productController.saveProduct);

router.get('/',productController.getProducts);

module.exports=router;