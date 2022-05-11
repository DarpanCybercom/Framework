const express = require("express");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const router = express.Router();

let routepath  = [];


const routeConfigFileName = 'route.json';
const routeControllerFolderName = 'controller';
const routeMiddlewareFolderName = 'middleware';


const coreApiFolderName = path.join(path.dirname(__dirname),framework.module);

let ModuleRoutes = [];


if (fs.existsSync(coreApiFolderName)) {
  
    const Controllers = fs.readdirSync(path.join(coreApiFolderName,routeControllerFolderName));

    


    Controllers.forEach((file) => {
        const [FileName] = file.split(".");

        global[FileName] = require(path.join(coreApiFolderName,routeControllerFolderName,file));


        
    });
    const MiddleWare = fs.readdirSync(path.join(coreApiFolderName,routeMiddlewareFolderName));

    MiddleWare.forEach((file) => {
        const [FileName] = file.split(".");

        global[FileName] = require(path.join(coreApiFolderName,routeMiddlewareFolderName,file));
    });



    /* Route Creation Progression */

    const route = require(path.join(coreApiFolderName,routeConfigFileName));

    route.forEach((routesPath) => {
        var mid =[];
       
        var ModulePathMethod = routesPath.method;  
        const Modulecontroller = eval(routesPath.controller);
        var ModulePath =  routesPath.path;
        
        routepath.push(ModulePath);


        routesPath.middlewares.forEach((ModuleMiddleware) => {
                mid.push(eval(ModuleMiddleware));
            })

        
        router.route(ModulePath)[ModulePathMethod](mid, Modulecontroller); 
        
        
    
    }); 
}


exports.coreRoute  = router;
exports.corePath  = routepath;