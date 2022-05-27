/* 
Author : Darpan Vadher

*******************Controller Example**********************

exports.ControllerFunctionName = async (req,res,next) =>{

  ...Your Code

}

**********Call Database Table for Opration*****************

Global Variable : framework
Database Variable : db
Table Name : product
Function Name : create()

await framework.db.[Table Name].[Database Opration Function];

***********************************************************


*******************Function Example**********************
Gobal Variable : framework
Function Variable : functions
Type of Function : globalFunction || moduleFunction
Function File Name : [Function File Name]
Function Name : [Function Name]


await framework.functions.[Type of Function].[Function File Name].[Function Name];



*******************Service Example**********************
Gobal Variable : framework
Services Variable : services
Type of Services : globalServices || moduleServices
Service File Name : [Service File Name]
Service Function Name : [Service Function Name]


await framework.services.[Type of Services].[Service File Name].[Service Function Name]; 


***********************************************************
*/




exports.get = async (req, res, next) => {
    let response = {
        status: "Success",
        message: "Sample Details",
    };
    res.status(200).json({message:"Success",response});
};


exports.add = async (req, res, next) => {
  


  res.status(200).json({status:"Success",message : "Holiday Details Added"});


};

exports.update = async (req, res, next) => {
      
      res.status(200).json({status:"Success",message : "Holiday Details Updated"}); 
};



exports.delete = async (req, res, next) => {
  res.status(200).json({status:"Success",message:"Holiday Deleted"});
};





