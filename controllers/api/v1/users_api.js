const User=require('../../../models/user');
//it is used to create json web token(jwt)
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){

    try{

        const user=await User.findOne({email:req.body.email});

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
                });
            }
            return res.json(200,{
                message:'Sign in Successful, here is your token!',
                data:{
                    //Whole user will be encrypted using (user.ToJSON())//AllSocial will be used to encrypt this token.
                    token:jwt.sign(user.toJSON(), 'AllSocial' , {expiresIn:'100000'})
                }
            })  

        
    }catch(err){
        return res.json(500,{
            message:"Internal Sever Error!"
        });
    }
}