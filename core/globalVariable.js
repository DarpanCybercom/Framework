framework = {};
const fs = require("fs");
const chalk = require('colors/safe')
const path = require("path");
const db = require("../db/models/index");
const appConfig = require("../config/appConfig.json");

const globalServices = require('./globals/globalServices');
const globalFunctions = require('./globals/globalFunction');
const coreMiddleware = require('./globals/globalMiddleware');
const moduleViseServices = require('./globals/moduleViseServices');
const moduleViseFunctions = require('./globals/moduleViseFunctions'); 


const { Op } = require("sequelize");
global.Op=Op

const ModuleFolderName = appConfig.AppConfig.apiFolderName;

framework.module = appConfig.AppConfig.apiFolderName;
framework.db = db;


/* get Module List  */
let modules ;
if (fs.existsSync(ModuleFolderName)) {
	modules = fs.readdirSync(ModuleFolderName);
 } else {
	console.log(chalk.red("Modules Not Available!"));
}
framework.modules = modules

/* Set Global Services */

if(Object.keys(globalServices.globalServices).length === 0)
{
	console.log(chalk.yellow("Global Services Not Available!"));
}else{
	framework.services = globalServices;
}

/* Set Global Functions */

if(Object.keys(globalFunctions.globalFunctions).length === 0)
{
	console.log(chalk.yellow("Global Function Not Available!"));
}else{
	framework.functions = globalFunctions;
}


/* Set Core Middleware */
if(Object.keys(coreMiddleware.globalCoreMiddleware).length === 0)
{
	console.log(chalk.yellow("Global Core Middleware Not Available!"));
}else{
	framework.middleware = coreMiddleware;
}

//Set Module Vise Service
if(Object.keys(moduleViseServices.moduleServices).length === 0)
{
	console.log(chalk.red("Module Service Not Available!"));
}else{
	framework.services = {...framework.services,...moduleViseServices};
}

//Set Module Vise Service

if(Object.keys(moduleViseFunctions.moduleFunctions).length === 0)
{
	console.log(chalk.red("Module Functions Not Available!"));
}else{
	framework.functions = {...framework.functions,...moduleViseFunctions};
}


global.framework = framework;