const fs = require("fs");
const path = require("path");
const chalk = require('colors/safe')
const ServicesFolderName = 'services';

const globalServicePath = path.join(CorePath,ServicesFolderName);


let  services ={};

if (fs.existsSync(globalServicePath)) {

        service =  fs.readdirSync(globalServicePath);	
   

        if(service.length != 0)
        {
                service.forEach(element => {

                const [ fileName, extension ] = element.split('.');
                        
                        if(extension == 'js')
                {

                        const service = require(path.join(globalServicePath, element));      
                
                        services[fileName] = service;    
                        
                }
                });
        }else{
                  console.log(chalk.yellow("Global Service Not Available"));
        }
 
}

exports.globalServices = services;