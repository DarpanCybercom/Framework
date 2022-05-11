const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const servicesFolderName = 'services';

const appConfig = require("../../config/appConfig.json");

const ModuleFolderName = appConfig.appConfig.apiFolderName;

let modules ;
if (fs.existsSync(ModuleFolderName)) {
	modules = fs.readdirSync(ModuleFolderName);
 } else {
	console.log(chalk.red("Modules Not Available!"));
}

let ModuleServices = {};

modules.forEach(Modules => {

     
  const ModuleServicesPath = path.join(CorePath,ModuleFolderName,Modules,servicesFolderName);

   
    if(fs.existsSync(ModuleServicesPath))
    {
        
        moduleService = fs.readdirSync(ModuleServicesPath);

        if(moduleService.length != 0)
        {

        

        moduleService.forEach(element => {
            
            const [ fileName , extension ] = element.split('.');

            if(extension == 'js')
            {
                const service = require(path.join(ModuleServicesPath, element));      
                ModuleServices[fileName] = service;
            }
       
            
        });
    }else{
        console.log(chalk.yellow(Modules + "'s Service Not Available"));
    }

    }else{
        console.log(chalk.yellow(Modules + "'s Service Not Available"));
    }
});



exports.moduleServices = ModuleServices;