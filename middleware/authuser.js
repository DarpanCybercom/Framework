const cookieParser = require('cookie-parser');

exports.registerValidate=(req,res,next)=>{
    
    console.log("this is validate");
    var Name = req.body.Name;
    var Password = req.body.Password;
    var UserRoll = req.body.UserRoll;


    if(Name == "")
    {   
        res.json({ error: "Name  is Empty" });
        return false;
    }else if (Password == ""){
        res.json({ error: "Password is Empty" });
        return false;
        
    }else if(UserRoll == ""){

        res.json({ error: "UserRoll is Empty" });
        return false;
    }else{
        next()
    }
}





exports.loginValidate=(req,res,next)=>{
    
    console.log("this is validate");
    var Email = req.body.Email;
    var Password = req.body.Password;


    if(Email == "")
    {   
        res.json({ error: "Name  is Empty" });
        return false;
    }else if (Password == ""){
        res.json({ error: "Password is Empty" });
        return false;
        
    }else{
        next()
    }
}




exports.Refreshvalidate=(req,res,next)=>{
 
    console.log(req.signedCookies);
    console.log(req.headers.authorization);

    const refreshtokens = req.signedCookies;
    const accessToken = req.headers.authorization;

    if(Object.keys(refreshtokens).length == 0)
    {
        
        res.json({status : "error" , Message : "Token are not Valid"});

    }else if(!accessToken){
        res.json({status : "error" , Message : "Token are not Valid"});

    }else{
        next();
    }


    


}