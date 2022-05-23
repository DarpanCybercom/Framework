const chalk = require("chalk");

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








exports.getproduct = async (req, res, next) => {
  console.log(chalk.yellow("get product is calling"));
  
  const response = await framework.services.Product.productservice.getproduct();
  
 res.status(200).json(response);

};

