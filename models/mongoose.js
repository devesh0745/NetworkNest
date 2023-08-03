const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
},{
    //It will tell(updated at and created at) every time some action is perform.
    timestamps:true
});

const User=mongoose.model('User',userSchema);

module.exports=User;