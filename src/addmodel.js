const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { execSync }   = require("child_process");
const TerminalLog = require('./colors');

const ConfigFileName = "appConfig.json";
const ConfigFilePath = path.join('config',ConfigFileName);      
const Template = require('./constString');

var ModelTemplate = Template.Model;
var MigrationTemplate = Template.Migration;
var SeederTemplate = Template.Seeder;



const CheckConfigFile = () => {

    if(!fs.existsSync(ConfigFilePath)){
        TerminalLog.error("Config File Not Found");
        return false;
    }
    return true;
};

var propmtForMissingOptions = async (name) => {   
    
    const questions = [];
    var answers;

    questions.push({
            type : 'input',
            name : 'name',
            message : 'Please Enter Model Name?'
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.name == "");


    return  answers.name.toLowerCase();
}

var renametemplateFiles = async (ModulePath , ModuleName,TableName,withTable) => {

    TerminalLog.debug("Renaming Files");

    if(fs.existsSync(ModulePath))
    {   
        const ApiTemplateFolderFile = fs.readdirSync(ModulePath);

      
        ApiTemplateFolderFile.forEach(FileFolder => {

            TerminalLog.debug("Table Name : " + TableName);

            TerminalLog.debug("With Table : " + withTable);

            if(FileFolder != 'route.json')
            {   
                
                const FolderFolderFile = fs.readdirSync(path.join(ModulePath,FileFolder));

                if(FolderFolderFile.length > 0)
                {
                    FolderFolderFile.forEach(element => {
                        


                        const NewNameFile = element.replace('example_', ModuleName.toLowerCase()) ;

                        fs.rename(path.join(ModulePath,FileFolder,element),path.join(ModulePath,FileFolder,NewNameFile), (err) => {
                            if(err)
                            {
                                TerminalLog.error("Error in File Rename" + err);
                            }
                        });
                    });   
                }
            }else{
                const Routes = fs.readFileSync(path.join(ModulePath,FileFolder));

                var RoutesJson = JSON.parse(Routes);

                RoutesJson.forEach(element => {
                    
                    var MiddleWares = [];

                    element.controller = element.controller.replace('example_', ModuleName.toLowerCase());
                
                    element.middlewares.forEach(MiddleWare => {
                        MiddleWares.push(MiddleWare.replace('example_', ModuleName.toLowerCase()));
                    });
                    
                    element.middlewares = MiddleWares;
                });
                fs.writeFileSync(path.join(ModulePath,FileFolder),JSON.stringify(RoutesJson));
            }         
        });        
    }else{
        TerminalLog.error("Error In Coping Template File..!");
        return ;
    }
};


var propmtForModuleOptions = async (ModuleNames) => {

    const questions = [];
    var answers;


    questions.push({
            type : 'list',
            name : 'moduleName',
            message : 'Please Select Module Name?',
            choices : ModuleNames
    });


    do {
         answers = await inquirer.prompt(questions);
    } while (answers.moduleName == "");

    return  answers.moduleName.toLowerCase();



}


var renameModelTemplateFiles = async (ModulePath,ModuleName,TableName,withTable) => {

    TerminalLog.debug("Renaming Files");

    if(fs.existsSync(ModulePath))
    {   
        const ApiTemplateFolderFile = fs.readdirSync(ModulePath);

        TerminalLog.debug("Table Name : " + ApiTemplateFolderFile);
    }

}


module.exports.addModel = async (arg) => {

    TerminalLog.info("Adding Model.....");

    TerminalLog.debug(arg);


    var IsFileAvailable = CheckConfigFile();

    if(!IsFileAvailable){

        console.log("Config File Not Found");
        console.log("Please Run 'npm run init' First In Your Project");
        console.log("then try again!!");
        return;
    }

    console.log("Config File Found");

    var configFile = fs.readFileSync(ConfigFilePath);
    var config = JSON.parse(configFile);

    console.log(config.AppConfig.apiFolderName); 

    var apiFolderPath = path.join(config.AppConfig.apiFolderName);


    var apiFolderExists = fs.existsSync(apiFolderPath);

    if(!apiFolderExists){
        fs.mkdirSync(apiFolderPath);
    }

    var Modules = fs.readdirSync(apiFolderPath);

    if(Modules.length == 0){
        console.log("No Module Found");
        return;
    }

    var ModuleNames = [];

    Modules.forEach(function(Module){
        ModuleNames.push(Module);
    });


   


    console.log("API Folder Found");

    if(!arg)
    {
        modelName = await propmtForMissingOptions(arg);
    }else{
        modelName = arg.toLowerCase();
    }


    TerminalLog.debug("Model Name : " + modelName);

    var ModuleName = await propmtForModuleOptions(ModuleNames);

    TerminalLog.debug("Module Name : " + ModuleName);

    


    var ModulePath = path.join(apiFolderPath,ModuleName);

    var ModulePathExists = fs.existsSync(ModulePath);

    if(!ModulePathExists){
        TerminalLog.error("Module Not Found");
        return;
    }

    var ModelPath = path.join(ModulePath,'models');
    var MigrationPath = path.join(ModulePath,'migrations');
    var SeederPath = path.join(ModulePath,'seeders');

    var ModelPathExists = fs.existsSync(ModelPath);

    if(!ModelPathExists){
        fs.mkdirSync(ModelPath);

        var ModelFilePath = path.join(ModelPath,modelName + '.js');

        var ModelFileExists = fs.existsSync(ModelFilePath);

        if(ModelFileExists){

            TerminalLog.error("Model Already Exists");
            return;
        }

        ModelTemplate = ModelTemplate.replaceAll('example',modelName);

        fs.writeFileSync(ModelFilePath,ModelTemplate);

        TerminalLog.info("Model Created");
    }else {

        var ModelFilePath = path.join(ModelPath,modelName + '.js');

        var ModelFileExists = fs.existsSync(ModelFilePath);

        if(ModelFileExists){

            TerminalLog.error("Model Already Exists");
            return;
        }

        ModelTemplate = ModelTemplate.replaceAll('example',modelName);

        fs.writeFileSync(ModelFilePath,ModelTemplate);

        TerminalLog.info("Model Created");
    }


    var MigrationPathExists = fs.existsSync(MigrationPath);
    
    if(!MigrationPathExists){

        TerminalLog.debug("Migration Creation Started");
    
        fs.mkdirSync(MigrationPath);

        var MigrationFilePath = path.join(MigrationPath, Date.now() + '_create_' + modelName + '.js');
    
        var MigrationFileExists = fs.existsSync(MigrationFilePath);

        if(MigrationFileExists){
                
                TerminalLog.error("Migration Already Exists");
                return;
        }

        MigrationTemplate = MigrationTemplate.replaceAll('example',modelName);

        fs.writeFileSync(MigrationFilePath,MigrationTemplate);

        TerminalLog.info("Migration Created");


    }else{
        TerminalLog.debug("Migration Creation Started");

       
        var MigrationFilePath = path.join(MigrationPath, Date.now() + '_create_' + modelName + '.js');
    
        var MigrationFileExists = fs.existsSync(MigrationFilePath);

        if(MigrationFileExists){
                
                TerminalLog.error("Migration Already Exists");
                return;
        }

        MigrationTemplate = MigrationTemplate.replaceAll('example',modelName);

        fs.writeFileSync(MigrationFilePath,MigrationTemplate);

        TerminalLog.info("Migration Created");
    }

    var SeederPathExists = fs.existsSync(SeederPath);

    if(!SeederPathExists){

        TerminalLog.debug("Seeder Creation Started");

        fs.mkdirSync(SeederPath);

        var SeederFilePath = path.join(SeederPath, Date.now() + '_demo_' + modelName + '.js');

        var SeederFileExists = fs.existsSync(SeederFilePath);

        if(SeederFileExists){

            TerminalLog.error("Seeder Already Exists");
            return;

        }

        SeederTemplate = SeederTemplate.replaceAll('example',modelName);

        fs.writeFileSync(SeederFilePath,SeederTemplate);

        TerminalLog.info("Seeder Created");

    }else{

        TerminalLog.debug("Seeder Creation Started");


        var SeederFilePath = path.join(SeederPath, Date.now() + '_demo_' + modelName + '.js');

        var SeederFileExists = fs.existsSync(SeederFilePath);

        if(SeederFileExists){

            TerminalLog.error("Seeder Already Exists");
            return;

        }

        SeederTemplate = SeederTemplate.replaceAll('example',modelName);

        fs.writeFileSync(SeederFilePath,SeederTemplate);

        TerminalLog.info("Seeder Created");

    }
};