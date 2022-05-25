const path = require("path");
const express = require("express");
const fs = require("fs");
const chalk = require('colors/safe');
const multer  = require('multer');


const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null,file.originalname);
	},
});

const upload = multer({storage: fileStorage});
let router = express.Router();

const coreRoutes = require("./routes/coreApiRoutes");
const ModuleFolderName = process.env.MODULE_FOLDERNAME;


router = coreRoutes.coreRoute;
const routesPathArray = coreRoutes.corePath;


 let ModuleRoutes = [];

const routeConfigFileName = 'route.json';
const routeControllerFolderName = 'controller';
const routeMiddlewareFolderName = 'middleware';


const ApiFolderNamePath = path.join(path.dirname(__dirname),framework.module);

framework.modules.forEach((element) => {

	if (fs.existsSync(path.join(ApiFolderNamePath,element) )) {
		modulesRoutes = fs.readdirSync(path.join(ApiFolderNamePath,element));

		
		const Controllers = fs.readdirSync(path.join(ApiFolderNamePath,element,routeControllerFolderName));


		Controllers.forEach((file) => {
			const [FileName ,extension] = file.split(".");

			if(extension == 'js')
			{

			global[FileName] = require(path.join(ApiFolderNamePath,element,routeControllerFolderName,file));
			}

			
		});
		
		const MiddleWare = fs.readdirSync(path.join(ApiFolderNamePath,element,routeMiddlewareFolderName));

		MiddleWare.forEach((file) => {
			const [FileName  ,extension] = file.split(".");
			if(extension == 'js' )
						{
						global[FileName] = require(path.join(ApiFolderNamePath,element,routeMiddlewareFolderName,file));
						}
			});
		
		const route = require(path.join(ApiFolderNamePath,element,routeConfigFileName));



    route.forEach(async (routesPath) => {

        var mid =[];
       
        var ModulePathMethod = routesPath.method;  
        const Modulecontroller = eval(routesPath.controller);

		var ModulePath;

	
		if(routesPath.global)
		{
			ModulePath =  routesPath.path;

		}else{

		 ModulePath =  "/" + element + routesPath.path;

		}


        routesPathArray.push(ModulePath);
		


		if(ModulePathMethod == 'post')
		{	
			if(routesPath.fileUpload)
			{	

				var x = [];
				x.push(upload.single(routesPath.fileUpload));

				var FileUploadMiddleware = await  framework.functions.globalFunctions.file_validation.validation(x);

				mid.push(FileUploadMiddleware);
				
				/* console.log(routesPath.fileupload); */

				
					mid.push(framework.middleware.globalCoreMiddleware.filevalidation.filevalidation);

				
				
			}
		}
        
        

        routesPath.middlewares.forEach((ModuleMiddleware) => {
                mid.push(eval(ModuleMiddleware));
        })

        router.route(ModulePath)[ModulePathMethod](mid, Modulecontroller); 
        
		
    }); 
		
	
			
	}
}); 


module.exports = router;
