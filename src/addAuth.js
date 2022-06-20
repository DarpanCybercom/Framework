const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { exec }   = require("child_process");
const TerminalLog = require("./colors");


const ConfigFileName = "appConfig.json";
const ConfigFilePath = path.join('config',ConfigFileName); 

const CheckConfigFile = () => {

    if(!fs.existsSync(ConfigFilePath)){
        console.log("Config File Not Found");
        return false;
    }
    return true;
};


const AskForAuthType = async () => {

    var questions = [];
    var answer;

    questions.push({
        type: 'list',
        name: 'authType',
        message: 'Select Auth Type',
        choices: ['Basic Auth', 'Basic Auth With Table' ,'Basic Auth With OAuth2', 'OAuth2']
    });


    do {
        answers = await inquirer.prompt(questions);
     } while (answers.authType == "");
 
 
     return  answers.authType;



}



module.exports.addAuth = async () => {

    TerminalLog.info("Adding Auth");
    
    var IsFileAvailable = CheckConfigFile();

    if(!IsFileAvailable){

    TerminalLog.error("Config File Not Found");
        return;
    }
  
    var configFile = fs.readFileSync(ConfigFilePath);
    var config = JSON.parse(configFile);


    var authType = await AskForAuthType();

    TerminalLog.debug(authType);

    





    
};