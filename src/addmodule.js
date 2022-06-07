const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { execSync }   = require("child_process");
const TerminalLog = require('./colors');

const ConfigFileName = "appConfig.json";
const ConfigFilePath = path.join('config',ConfigFileName);      





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

            TerminalLog.debug("Table Name : " + TableName);

            TerminalLog.debug("With Table : " + withTable);

            if(FileFolder != 'route.json')
            {   
                /* if(withTable == false && FileFolder == 'models' || FileFolder == 'migrations' || FileFolder == 'seeders')
                {   
                    TerminalLog.debug("File Folder : " + FileFolder);
                    TerminalLog.debug('rmdir /s ' + path.join(ModulePath,FileFolder));
                    execSync('rmdir /s "' + path.join(ModulePath,FileFolder) +'"', (error, stdout, stderr) => {
                        if (error) {
                            TerminalLog.error(`exec error: ${error}`);
                            return;
                        }
                });

                }else{
                    TerminalLog.debug("Renaming File : " + FileFolder);
                } */
                
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


    TerminalLog.debug("Module Name : " + moduleName);
    TerminalLog.debug("Table Name : " + tableName);
    TerminalLog.debug("With Table : " + withTable);

    
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
                console.log('Module Added');          
            return;
        }

        execSync('git clone -b new_module --single-branch https://github.com/DarpanCybercom/Framework.git ' + fileUploadFolderPath, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }               
            });   
            renametemplateFiles(fileUploadFolderPath,moduleName,tableName,withTable);
            console.log('Module Added');                    
        return;
    });



};