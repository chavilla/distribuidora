const carController=require('../../controllers/carController');
const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');


router.post('/',carController.addProduct);
router.delete('/:id', auth, carController.deleteProduct);
router.get('/:userId', carController.getProductCar);

module.exports=router;