const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const FunctionFolderName = 'functions';

const globalFunctionPath = path.join(CorePath,FunctionFolderName);


let  functions ={};

if (fs.existsSync(globalFunctionPath)) {

	functionss =  fs.readdirSync(globalFunctionPath);	
        
        if(functionss.length !=0)
        {

     functionss.forEach(element => {

        const [ fileName , extension ] = element.split('.');
        
        if(extension == 'js')
            {
        const gfunction = require(path.join(globalFunctionPath, element));      
     
        functions[fileName] = gfunction; 
            }   
	}); 
        }else{
console.log(chalk.yellow("Global Function Not Available"));
        }
 
}

exports.globalFunctions = functions;