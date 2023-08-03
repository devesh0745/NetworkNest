module.exports.home=function(req,res){
    return res.render('home',{
        title:'AllSocial'
    })
};

module.exports.loginPage=function(req,res){
    return res.render('login',{
        title:'AllSocial'
    })
};
