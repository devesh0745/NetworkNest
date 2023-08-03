module.exports.home=function(req,res){
    console.log(req.cookies)
    res.cookie('user_id',65);
    return res.render('home',{
        title:'AllSocial'
    })
};

module.exports.loginPage=function(req,res){
    return res.render('login',{
        title:'AllSocial'
    })
};
