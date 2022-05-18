'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const appConfig = require(path.join(path.dirname(__dirname),'../','config/appConfig.json'));
const config = appConfig?.DbConfig;
const db = {};
let sequelize;


if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


const ModuleFolderName =  process.env.MODULE_FOLDERNAME || 'api';
const ModelFolderName = 'models';

if (fs.existsSync(path.join(path.dirname(__dirname),'../',ModuleFolderName) )) {


	const modules = fs.readdirSync(path.join(path.dirname(__dirname),'../',ModuleFolderName));

  modules.forEach(element => {

	
		if (fs.existsSync(path.join(path.dirname(__dirname),'../',ModuleFolderName,element,ModelFolderName))){

		const	moduleModel =  fs.readdirSync(path.join(path.dirname(__dirname),'../',ModuleFolderName,element,ModelFolderName));

   


    moduleModel.forEach(Model => {
			const modelPath =path.join(path.dirname(__dirname),'../',ModuleFolderName,element,ModelFolderName)
      
      

    
      const model = require(path.join(modelPath, Model))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;

				}); 

		}else{
			console.log(element + " Api Service Not Found");
		}


});


 } else {
	throw new Error("Modules Not Found");
}



Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); 





db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
