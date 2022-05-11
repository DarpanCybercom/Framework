const path = require('path');
const fs = require('fs');
const  { exec }   = require("child_process");
const { Umzug , SequelizeStorage} = require('umzug');
const ModuleFolderName = 'api';

const DataBaseConfig = require(path.join(path.dirname(__dirname),'../','config/appConfig.json'));


const db =  require(path.join(path.dirname(__dirname),'../',DataBaseConfig.dbMigrationCofig.dbModelConfigFile));


var sequelize = db.sequelize;

var moduleMigration =[];

moduleMigration.push('db/migrations/*.js');

let modules ;
if (fs.existsSync(ModuleFolderName)) {
	modules = fs.readdirSync(ModuleFolderName);
 } else {
	console.log(chalk.red("Modules Not Available!"));
}


modules.forEach(element => {

  

	var moduleMigrationPath = ModuleFolderName+"/"+element+"/migrations/*.js";

	moduleMigration.push(moduleMigrationPath);


});

const mm = '{'+moduleMigration.splice(",")+'}';

const umzug = new Umzug({
  migrations: { glob: mm },
  context: sequelize.getQueryInterface(), sequelize,
  storage: new SequelizeStorage({ sequelize }),
});




exports.pending = async () =>{
return await umzug.pending();
};

exports.executed = async () => {
return await umzug.executed();
}; 


exports.up = async () => { 
  await umzug.up();
};