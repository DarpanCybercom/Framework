const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { exec }   = require("child_process");

const ConfigFileName = "appConfig.json";
const ConfigFilePath = path.join('config',ConfigFileName);
const RouteFileName =   'route.json';

const CheckConfigFile = () => {

    if(!fs.existsSync(ConfigFilePath)){
        console.log(ConfigFilePath);
        console.log("Config File Not Found");
        return false;
    }
    return true;
};

var propmtForModuleOptions = async (ModuleNames) => {   
    
    const questions = [];
    var answers;

    console.log(ModuleNames);

    questions.push({
            type : 'list',
            name : 'ModuleName',
            message : 'Please Enter Module Name?',
            choices : ModuleNames
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.ModuleName == "");


    return  answers.ModuleName.toLowerCase();
}

var propmtForRouteOptions = async (ModuleNames) => {   
    
    const questions = [];
    var answers;

    console.log(ModuleNames);

    questions.push({
            type : 'list',
            name : 'ModuleName',
            message : 'Please Enter Module Name?',
            choices : ModuleNames
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.ModuleName == "");


    return  answers.ModuleName.toLowerCase();
}





module.exports.addFileUpload = async () => {

    console.log("File Upload Module Intializing.....");
    console.log("File Upload Module Intialized");
    
    var IsFileAvailable = CheckConfigFile();

    if(!IsFileAvailable){

        console.log("Config File Not Found");
        console.log("Please Run 'npm run init' First In Your Project");
        console.log("then try again!!");
        return;
    }

    const ConfigFile = JSON.parse(fs.readFileSync(ConfigFilePath));
    const ApiFolderPath = path.join(ConfigFile.AppConfig.apiFolderName);
    const ApiFolderExists = fs.existsSync(ApiFolderPath);

    if(!ApiFolderExists){
        console.log("API Folder Not Found");
        return;
    }

    console.log("API Folder Found");

    var Modules = fs.readdirSync(ApiFolderPath);

    if(Modules.length == 0){
        console.log("No Module Found");
        return;
    }

    console.log("Modules Found");

    var ModuleNames = [];
    var RoutePath = [];

    Modules.forEach(function(Module){
        ModuleNames.push(Module);
    });


    propmtForModuleOptions(ModuleNames).then(async (ModuleName) => {
        
        console.log("Module Name : " + ModuleName);

        var RouteFilePath = path.join(ApiFolderPath,ModuleName,RouteFileName);

        console.log("Route File Path : " + RouteFilePath);

        var RouteFileExists = fs.existsSync(RouteFilePath);

        if(!RouteFileExists){
            console.log("Route File Not Found");
            return;
        }

        console.log("Route File Found");

        var RouteFile = JSON.parse(fs.readFileSync(RouteFilePath));

        RouteFile.forEach(route => {

                if (route.method == "post") {
                    RoutePath.push(route.path);
                    console.log(route.path);
                }
        });
    });


    
    
    
    
    
    
    
    
    
    
    
    const questions = [
        {
            type: 'input',
            name: 'fileUploadName',
            message: 'Enter File Upload Name',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please Enter File Upload Name';
                }
            }
        },
        {
            type: 'input',
            name: 'fileUploadDescription',
            message: 'Enter File Upload Description',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please Enter File Upload Description';
                }
            }
        },
    ];


    
};