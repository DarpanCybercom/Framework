const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { exec }   = require("child_process");

const ConfigFileName = "appConfig.json";
const ConfigFilePath = path.join(__dirname,'config',ConfigFileName);


const CheckConfigFile = () => {

    if(!fs.existsSync(ConfigFilePath)){
        console.log(ConfigFilePath);
        console.log("Config File Not Found");
        return false;
    }
    return true;
};




module.exports.addModule = async () => {

    console.log("File Upload Module Intializing.....");
    console.log("File Upload Module Intialized");

    var IsFileAvailable = CheckConfigFile();

    if(!IsFileAvailable){

        console.log("Config File Not Found");
        return;
    }

    console.log("Config File Found");

    var configFile = fs.readFileSync(ConfigFilePath);
    var config = JSON.parse(configFile);

    console.log("Config File Loaded");

    console.log(config.AppConfig.apiFolderName); 

};