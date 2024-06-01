const session=require('express-session');
const isValid=require('../modules/validator');

module.exports.home=(req,res)=>{
    if(!req.session.user){
        res.redirect('login.html');
    }else{
        res.render('index',{userid:req.session.user});
    }
}

module.exports.login=async (req,res)=>{
    const body=req.body;
    res.setHeader('Content-Type','application/json');
    try{
        const userid= await isValid(body.username,body.password);
        if(userid!=-1){
            req.session.isLoggedIn=true;
            req.session.user=userid;
            res.status(200).send(JSON.stringify({login:true,message:"Success"}));
        }else{
            res.status(200).send(JSON.stringify({login:false,message:"Username or Password is Wrong"}));
        }
    }catch(err){
        console.log("Error in Query"+err);
    }
}

module.exports.logout=(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            res.status(502).send("Could not log out Try again");
        }
    })
    res.clearCookie('connect.sid');
    res.status(200).send("Logout Success");
}