/* 

Auther : Darpan Vadher

******************Middleware Example**********************


exports.[Service Name] = async (Parameters) =>{

    ...Your Code

    return; //Return Value    
}




**********Call Database Table for Opration*****************

Global Variable : framework
Database Variable : db
Table Name : SampleTable
Function Name : create()

await framework.db.[Table Name].[Database Opration Function];



*/


exports.sampleService= async ()=>{

    console.log("Sample Service");
    
    return "Sample Service";
 
}
