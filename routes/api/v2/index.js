//root index for v2 routes.

const express=require('express');

const router=express.Router();

router.use('/posts',require('./posts'))

module.exports=router;