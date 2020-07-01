const express=require('express');
const router=express.Router();
const authController=require('../../controllers/authController');
const auth=require('../../middleware/auth');

router.post('/', authController.loginUser);
router.get('/', auth, authController.userAuthenticated);

module.exports=router;