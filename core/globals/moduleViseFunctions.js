const fs = require("fs");
const path = require("path");
var chalk = require('colors/safe')

const FunctionFolderName = 'functions';

const appConfig = require("../../config/appConfig.json");

const ModuleFolderName = appConfig.AppConfig.apiFolderName;

let modules ;


if (fs.existsSync(ModuleFolderName)) {
	modules = fs.readdirSync(ModuleFolderName);
 } else {
	console.log(chalk.red("Modules Not Available!"));
}


let ModuleFunctions = {};

modules.forEach(Modules => {

     
  const ModuleFunctionPath = path.join(CorePath,ModuleFolderName,Modules,FunctionFolderName);

   
    if(fs.existsSync(ModuleFunctionPath))
    {
        
        moduleFunction = fs.readdirSync(ModuleFunctionPath);
        if(moduleFunction.length != 0)
        {

        moduleFunction.forEach(element => {
            
            const [ fileName , extension ] = element.split('.');
            if(extension == 'js')
            {

            const service = require(path.join(ModuleFunctionPath, element));      
                    
            ModuleFunctions[fileName] = service;
            }
        });

    }else{
        console.log(chalk.yellow(Modules + "'s Function Not Available"));
    }

    }else{
        console.log(chalk.yellow(Modules + "'s Function  Not Available"));
    }
});



exports.moduleFunctions = ModuleFunctions;