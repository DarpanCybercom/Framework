const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { exec }   = require("child_process");

const ConfigFileName = "appConfig.json";
const ConfigFilePath = path.join('config',ConfigFileName);


const CheckConfigFile = () => {

    if(!fs.existsSync(ConfigFilePath)){
        console.log(ConfigFilePath);
        console.log("Config File Not Found");
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

var renametemplateFiles = async (ModulePath , ModuleName) => {

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
                                console.log(error("Error in File Rename") + err);
                            }
                        });
                    });   
                }
            }         
        });        
    }else{
        console.log(error("Error In Coping Template File..!"));
        return ;
    }



};




module.exports.addModule = async (arg) => {

    console.log("Module Intializing.....");
    
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



        var fileUploadFolderPath = path.join(apiFolderPath,moduleName);
        
        fs.access(fileUploadFolderPath, fs.constants.F_OK, (err) => {
            if (err) {
                exec('git clone -b new_module --single-branch https://github.com/DarpanCybercom/Framework.git ' + fileUploadFolderPath, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }               

                    renametemplateFiles(fileUploadFolderPath,moduleName);
                    console.log('Module Added');
                    });                       
                return;
            }

            exec('git clone -b new_module --single-branch https://github.com/DarpanCybercom/Framework.git ' + fileUploadFolderPath, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }               
                renametemplateFiles(fileUploadFolderPath,moduleName);
                console.log('Module Added');
                });                       
            return;
        });



};