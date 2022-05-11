const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dbConfig = require(path.join(path.dirname(__dirname),'../','config/appConfig.json'));
/* 
console.log(dbConfig.globalModelFolderName);
console.log(dbConfig.moduleModelFolderName);
console.log(dbConfig.modelFolderName);  */

let models = [];

//Get Global Models 
if(fs.existsSync(path.join(path.dirname(__dirname),'../',dbConfig.dbMigrationCofig.globalModelFolderName))){

  

  
    if (fs.existsSync(path.join(path.dirname(__dirname),'../',dbConfig.dbMigrationCofig.globalModelFolderName,dbConfig.dbMigrationCofig.modelFolderName))){

          const	moduleModel =  fs.readdirSync(path.join(path.dirname(__dirname),'../',dbConfig.dbMigrationCofig.globalModelFolderName,dbConfig.dbMigrationCofig.modelFolderName));


          moduleModel.forEach(model => {

            const [ fileName , extension ] = model.split('.');
        
        if(extension == 'js' && fileName != 'index')
            {
    models.push({[fileName] : fileName+"s"});
 
            }   
  });
}else{
  console.log(chalk.yellow("Global Models Not Available!"));
}


}else{
  console.log(chalk.yellow("Global Models Folder Not Available!"));
}





//Get All Modules All Models 
if( fs.existsSync(path.join(path.dirname(__dirname),'../',dbConfig.appConfig.apiFolderName)) )
{
  const modules = fs.readdirSync(path.join(path.dirname(__dirname),'../',dbConfig.appConfig.apiFolderName));


  modules.forEach(element => {

    if (fs.existsSync(path.join(path.dirname(__dirname),'../',dbConfig.appConfig.apiFolderName,element,dbConfig.dbMigrationCofig.modelFolderName))){

          const	globalModel =  fs.readdirSync(path.join(path.dirname(__dirname),'../',dbConfig.appConfig.apiFolderName,element,dbConfig.dbMigrationCofig.modelFolderName));


          globalModel.forEach(model => {

            const [ fileName , extension ] = model.split('.');
        
        if(extension == 'js')
            {
    
        models.push({[fileName] : fileName+"s"});

            }   


          });


          


    }else{
      console.log(chalk.yellow(element + "'s Models Not Available!"));
    }

    
  });



}else{
console.log(chalk.yellow("Models Not Available!"));
}



module.exports = models;