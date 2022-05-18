const chalk = require('colors/safe')

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

**********Call Database Table for Opration*****************

Global Variable : framework
Database Variable : db
Table Name : product
Function Name : create()

await framework.db.[Table Name].[Database Opration Function];

***********************************************************






***********************************************************
*/




exports.getDetails = async (req, res, next) => {
    let response;
    if(req.body.page && req.body.totalData)
    {
      var {limit , offset} =  await framework.functions.moduleFunctions.holidayfunction.getPagination(req.body.page,req.body.totalData)
      const data = await framework.db.holidaymaster.findAndCountAll({where:{deletedAt:null},limit, offset});
      response = await framework.functions.moduleFunctions.holidayfunction.getPagingData(data, req.body.page, req.body.totalData);
    }else{
      response = await framework.db.holidaymaster.findAndCountAll({where:{deletedAt:null}});
    }
    res.status(200).json({message:"Success",response});
};


exports.addDetails = async (error, req, res, next) => {
  
  console.log(error);


  /* const  HolidayDetails = {
      
      title : req.body.title,
      isActive : req.body.isActive,
      fromDate : req.body.fromDate,
      toDate : req.body.toDate,
  }

  await framework.db.holidaymaster.create(HolidayDetails); 


  res.status(200).json({status:"Success",message : "Holiday Details Added"});
 */

};


exports.deleteDetails = async (req, res, next) => {
  
  var Id = req.params.id; 
    var  response = await framework.db.holidaymaster.findOne({where:{id:Id , deletedAt:null}});

  if(response === null) res.status(400).json({status:"Error",message:"Id Not Found"});


  var dataId = response.id;
  var date = new Date();
  var deleteResponse =  await framework.db.holidaymaster.update({deletedAt:date},{where:{id:dataId}})

  res.status(200).json({status:"Success",message:"Holiday Deleted"});
};


exports.updateDetails = async (req, res, next) => {
 
  var dataId = req.params.id;

  console.log(dataId);

      const  HolidayDetails = {    
        title : req.body.title,
        isActive : req.body.isActive,
        fromDate : req.body.fromDate,
        toDate : req.body.toDate,
      }

    
      await framework.db.holidaymaster.update(HolidayDetails,{where:{id:dataId}});



    res.status(200).json({status:"Success",message : "Holiday Details Updated"}); 


};



