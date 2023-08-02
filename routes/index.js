//All the routes will be in this file.
//Index is my parent routes.

const express=require('express');
const router=express.Router();

//By this we can access home_controller file.
const homeController=require('../controllers/home_controller');

console.log("Router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));


//So this router can be access to main index file.
module.exports=router