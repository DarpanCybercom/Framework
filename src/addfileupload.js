const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { exec }   = require("child_process");

const ConfigFileName = "appConfig.json";
const ConfigFilePath = path.join(__dirname,'config',ConfigFileName);


module.exports.addFileUpload = async () => {

    console.log("File Upload Module Intializing.....");
    console.log("File Upload Module Intialized");
    console.log(ConfigFilePath);
    let FolderName = "api";

    
};