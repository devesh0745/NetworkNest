const express=require('express');
const passport=require('passport');

const router=express.Router();

const postsApi=require('../../../controllers/api/v1/posts_api');
router.get('/',postsApi.index);
                    //Authentication
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);
//passport.authenticate('jwt',{session:false}),
module.exports=router;
