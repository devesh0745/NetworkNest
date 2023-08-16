const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

console.log('nodemailer running');


//transport defines the config using which will be sending emails.
let transporter=nodemailer.createTransport({
    
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    //auth is an authentication object in transporter.
    auth:{
        user:'sdevesh227@gmail.com',
        pass:'mekkybjjnmqtjuyg'
    }
});

//relative path is from where mail is send.
let renderTemplate=(data,relativePath)=>{
    //mailHTML storing what html is going to be send on email.
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        //data is the context that we pass to the ejs.
        data,
        //template is basically what is composed of this((__dirname,'../views/mailers',relativePath)).
        function(err,template){
            if(err)
            {
                console.log('error in rendering template',err);
                return
            }

            mailHTML=template;
            
        }
    )  
    return mailHTML;

}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}