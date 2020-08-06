const carController=require('../../controllers/carController');
const express=require('express');
const router=express.Router();


router.post('/', carController.addProduct);
router.delete('/:id', carController.deleteProduct);
router.get('/:userId', carController.getProductCar);

module.exports=router;