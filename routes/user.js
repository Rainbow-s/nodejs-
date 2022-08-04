const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
router.post('/api/register',userController.register);
router.post('/api/login',userController.login);
router.post('/getUserMessage',userController.getUserMessage);
module.exports=router;