const express=require('express');
const router=express.Router();
const passport=require('passport');


const frindsController=require('../controllers/friends_controller');

router.post('/create-friend',passport.checkAuthentication,frindsController.createFriendship);

module.exports=router;