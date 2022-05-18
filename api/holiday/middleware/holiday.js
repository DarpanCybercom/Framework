
exports.validateDate=(req,res,next)=>{

    console.log(req.body);
   
    /* var fromDate = new Date(req.body.fromDate);
    var toDate = new Date(req.body.toDate);

    var diff = toDate.getTime() - fromDate.getTime(); 
    var daydiff = diff / (1000 * 60 * 60 * 24);   

    if(daydiff >= 0)
    {
        
    }else{
        res.status(400).json({status:"Error",message:"Invalid Date"});
    } */

 
}

exports.inputCheck=(req,res,next)=>{
    console.log(req.body);
    /* if(req.body.title != "" && req.body.isActive != "" && req.body.fromDate != "" && req.body.toDate != "")
    {
        
    }else{
        res.status(400).json({status:"Error",message:"Invalid Input"});
    }
 */}