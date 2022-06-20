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
            message : 'Please Enter Module Name?'
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


var askForModelName = async () => {

    var questions = [];
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


var askForTable = async () => {

    var questions = [];
    var answers;

    questions.push({
            type : 'list',
            name : 'withTable',
            message : 'Do you Want Table For Module?',
            choices : ['Yes','No']
        });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.name == "");

    return  answers.withTable.toLowerCase();
}


var createModel = async (ModulePath,ModuleName,modelName) => {
    
    TerminalLog.debug("Creating Model");

    if(fs.existsSync(ModulePath))
    {
        TerminalLog.debug("Module Path : " + ModulePath);
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

    }

}



module.exports.addModule = async (withTable,arg) => {

    TerminalLog.info("Adding Module.....");
    TerminalLog.debug(withTable);
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

    console.log("API Folder Found");


    console.log("Folder Path : " + apiFolderPath);
    console.log("FolderName : " + arg);


    if(!arg)
    {
        moduleName = await propmtForMissingOptions(arg);
    }else{
        moduleName = arg.toLowerCase();
    }

    if(withTable == false)
    {
       var  withTableBool = await askForTable();
    }else{
        withTableBool = "yes";
    }


    if(withTableBool == "yes")
    {
        var tableName = await askForModelName();
    }else{
        tableName = "";
    }

    var fileUploadFolderPath = path.join(apiFolderPath,moduleName);


    fs.access(fileUploadFolderPath, fs.constants.F_OK, (err) => { 
        if (err) {
            execSync('git clone -b new_module --single-branch https://github.com/DarpanCybercom/Framework.git ' + fileUploadFolderPath, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }               
                });             
                renametemplateFiles(fileUploadFolderPath,moduleName,tableName,withTable);

                TerminalLog.info("Model Adding Started");
                createModel(fileUploadFolderPath,moduleName,tableName);
                TerminalLog.info("Model Added Successfully");
                TerminalLog.info('Module Added Successfully');      
            return;
        }

        execSync('git clone -b new_module --single-branch https://github.com/DarpanCybercom/Framework.git ' + fileUploadFolderPath, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }               
            });   
            renametemplateFiles(fileUploadFolderPath,moduleName,tableName,withTable);
            TerminalLog.info("Model Adding Started");
                createModel(fileUploadFolderPath,moduleName,tableName);
                TerminalLog.info("Model Added Successfully");
                TerminalLog.info('Module Added Successfully');                    
        return;
    });



};