const fs = require("fs");
const path = require("path");
const chalk = require('colors/safe')

const MiddlewareFolderName = 'middleware';
const globalCoreMiddlewarePath =  path.join(CorePath,'core',MiddlewareFolderName);



let  coremiddlewares = {};

if (fs.existsSync(globalCoreMiddlewarePath)) {
	middlewaress = fs.readdirSync(globalCoreMiddlewarePath);

	if(middlewaress.length != 0 )
	{
	middlewaress.forEach(element => {
		const [ fileName , extension ] = element.split('.');
		
		if(extension == 'js')
            {
				const middleware = require(path.join(globalCoreMiddlewarePath, element));      
			
				coremiddlewares[fileName] = middleware;  
			}
	});
	}else{
  console.log(chalk.yellow("Core Middleware Not Available"));
	}
}else{
	  console.log(chalk.yellow("Core Middleware Not Available"));
}


exports.globalCoreMiddleware = coremiddlewares;



