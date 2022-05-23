
exports.validate=(req,res,next)=>{
    console.log("this is validate");
    next()
}

exports.check=(req,res,next)=>{
    console.log("this is check");
    next()
}