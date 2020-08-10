const express=require('express');
const router=express.Router();
const saleController=require('../../controllers/saleController');

//Introduce una venta en la base de datos
router.post('/', saleController.addSale);

module.exports=router;
