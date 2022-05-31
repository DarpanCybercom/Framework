/* 

Auther : Darpan Vadher

******************Middleware Example**********************


exports.[MiddleWare Function Name] = async (req,res,next) =>{

    ...Your Code

    next(); //Call Next Middleware    
}



*/


exports.sampleMiddleWare=(req,res,next)=>{

    console.log("Sample Middleware");
    next();
 
}
