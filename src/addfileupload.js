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

    questions.push({
            type : 'list',
            name : 'ModuleName',
            message : 'Please Select Module?',
            choices : ModuleNames
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.ModuleName == "");


    return  answers.ModuleName.toLowerCase();
}

var propmtForRouteOptions = async (RoutePath) => {   
    
    const questions = [];
    var answers;

    questions.push({
            type : 'list',
            name : 'Route',
            message : 'Please Select Route?',
            choices : RoutePath
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.Route == "");


    return  answers.Route.toLowerCase();
}


var propmtForValidation = async () => {
        
    console.log("Enter Your Validation Details For File Upload");

        const questions = [];
        var answers;

        var validation = {};
    
        questions.push({
                type : 'input',
                name : 'max_size',
                message : 'Please Enter Maximum File Size (In MB)?',
        },
        {
                type : 'list',
                name : 'allowed_types',
                message : 'Please Select Valid File Type?',
                choices : ["image/jpeg", "image/png", "image/gif", "image/jpg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
        },
        {
                type : 'list',
                name : 'allowed_extensions',
                message : 'Please Enter Maximum Width (In Pixels)?',
                choices : ["jpg", "png", "gif", "pdf", "doc", "xls", "ppt"]
        },
        {
                type : 'input',
                name : 'file_count',
                message : 'Please Enter Maximum File Allow?',
        },
        {
                type : 'list',
                name : 'required',
                message : 'Is File Required?',
                choices : ["true", "false"]
        },
        {
                type : 'input',
                name : 'upload_path',
                message : 'Please Enter Upload Path?',
        });
            
        do {
        answers = await inquirer.prompt(questions);
        } while (answers == "");


        validation.max_size = answers.max_size || null;
        validation.allowed_types = answers.allowed_types || null;
        validation.allowed_extensions = answers.allowed_extensions || null;
        validation.file_count = answers.file_count || null;
        validation.required = answers.required || null;
        validation.upload_path = answers.upload_path || null;

        return validation;
}

var promptForNumberOfFields = async () => {
    const questions = [];
    var answers;

    questions.push({
            type : 'input',
            name : 'NumberOfFields',
            message : 'Enter Number of Fields?',
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.NumberOfFields == "");


    return  answers.NumberOfFields.toLowerCase();

}

var promptForFields = async () => {

    const questions = [];
    var answers;

    questions.push({
        type : 'input',
        name : 'name',
        message : 'Enter Field Name?'
    },{
        type : 'list',
        name : 'diffValidation',
        message : 'Do you want to add Diffrent validation For This Fields?',
        choices : ["Yes", "No"]
    });
  
    do {
        answers = await inquirer.prompt(questions);
    } while (answers.name == "" || answers.diffValidation == "");


    if(answers.diffValidation == "Yes"){
        answers.validation = await propmtForValidation();
    }else{
        answers.validation = {};
    }


    delete answers.diffValidation;

    return answers;

}


var promptForCustomMiddleware = async () => {
    const customMiddlewareQuestions = [];
    const questions = [];
    var answers;

    customMiddlewareQuestions.push({
        type : 'list',
        name : 'customMiddleware',
        message : 'Do you want to use Custom Middleware?',
        choices : ["Yes", "No"]
    });

    



    questions.push({
        type : 'input',
        name : 'name',
        message : 'Enter Name of Middleware ([FileName].[functionName])?'
    },{
        type : 'list',
        name : 'global',
        message : 'is This Middleware in Global Middleware Folder?',
        choices : ["Yes", "No"]
    });
    do {
        customMiddlewareAnswers = await inquirer.prompt(customMiddlewareQuestions);
    } while (customMiddlewareAnswers.customMiddleware == "");


    if(customMiddlewareAnswers.customMiddleware == "Yes"){

        do {
            answers = await inquirer.prompt(questions);
        } while (answers.name == "" || answers.global == "");

    }else{
        answers = {};
    }


    return answers;


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
    var FileUpload = [];
    var Fields = [];

    Modules.forEach(function(Module){
        ModuleNames.push(Module);
    });


    var ModuleName = await propmtForModuleOptions(ModuleNames);

    var RouteFilePath = path.join(ApiFolderPath,ModuleName,RouteFileName);

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
            }
    });


    var RoutePath = await propmtForRouteOptions(RoutePath);

    var validation = await propmtForValidation();

    var NumberOfFields = await promptForNumberOfFields();
   
    for (var i = 0; i < NumberOfFields; i++) {
    var Field = await promptForFields();  
        Fields.push(Field);
    }

    var CustomMiddleware = await promptForCustomMiddleware();

    var FileUpload = {
        validation : validation,
        fields : Fields,
        customMiddleware : CustomMiddleware
    }

    console.log(FileUpload);

    RouteFile.forEach(route => {
            
                if (route.path == RoutePath) {
                    route.fileUpload = FileUpload;
                }

    });

    fs.writeFileSync(RouteFilePath, JSON.stringify(RouteFile, null, 2));

    console.log("File Upload Module Completed");
};