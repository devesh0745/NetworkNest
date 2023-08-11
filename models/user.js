const mongoose=require('mongoose');

//will be using multer for each specific file
const multer=require('multer');

const path=require('path');
//will store this path in avatar_path
const AVATER_PATH=path.join('/uploads/users/avatars');


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
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
    
},{
    //It will tell(updated at and created at) every time some action is perform.
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATER_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

//statics methods
//this will attach the diskstorage on multer on the storage property.//single will tell to upload the single file only.
userSchema.statics.uploadedAvatar=multer({ storage: storage }).single('avatar');

//So this avatar_path can be available publicially.
userSchema.statics.avatarPath=AVATER_PATH;

const User=mongoose.model('User',userSchema);

module.exports=User;