import {exec} from 'child_process';
import fs     from "fs";
import chalk  from "chalk";
import path   from "path";
import fse    from "fs-extra";
import arg    from 'arg';
import pkg    from 'inquirer';



/* Terminal Function With Chalk  #START#*/
const success = chalk.green;
const warning = chalk.yellow;
const error = chalk.red;
/* Terminal Function With Chalk  #END#*/


/* Static Constant Variable  #START#*/
const projectPath = path.resolve();
const projectConfigFolderName = "config";
const projectConfigFileName = "appConfig.json";
const projectPackageJsonFileName = "package.json";
const projectCustomCommandFolderName = "bin";



const configFolderPath = path.join(projectPath,projectConfigFolderName);
const configFilePath = path.join(projectPath,projectConfigFolderName,projectConfigFileName);
const customCommandFolder = path.join(projectPath,projectCustomCommandFolderName);
const packagePath = path.join(projectPath,projectPackageJsonFileName);

/* Static Constant Variable  #END#*/

/* Application Config Object */

var configObject = {
    AppConfig : {
        port : null,
        apiFolderName : null,
        nodeEnviroment : null,
    },
    DbConfig: {
        username : null,
        password : null,
        database : null,
        host : null,
        dialect : null,
    },
    DbMigrationCofig :{
        dbModelConfigFile: "db/models/index.js",
        globalModelFolderName: "db",
        modelFolderName: "models",
        migrationFolderName: "migrations"
    },
    SecretKeyConfig: {
        jwtAccessTokenSecretKey : null,
        jwtRefreshTokenSecretKey : null,
        cookieSecretKey : null
    },
    AwsS3Config:{
        awsS3BucketName: null,
        awsS3AccessId : null,
        awsS3SecretKey : null
    }
};

let binObject = {};
/* Application Config Object */

/* Important Functions #START#*/
var checkForConfigFileAvailability = new Promise((resolve,reject) => {

    /* Config Check flags #START# */
    var arrQues = [];
    let askForAppConfigAllTheDetails = false;
    let askForDbConfigAllTheDetails = false;
    let askForAwsS3ConfigAllTheDetails = false;
    let askForSecretKeyConfigAllTheDetails = false;
    let askForAllTheDetails = false;
    /* Config Check flags #START# */

    /* Check For Config Folder Available or Not */
    if(!fs.existsSync(configFolderPath)){
        fs.mkdir(configFolderPath,(error) => {
            if (error) {
                console.log(error);
            }
        });
    }
    /* Check For Config File In Config Folder */
    if(!fs.existsSync(configFilePath))
    {
        // if files does not exists
        fs.writeFileSync(configFilePath, "");
    }
    /* Set Config For Application */
    try {
        // check if file having read/write permission or not.
        fs.accessSync(configFilePath, fs.constants.R_OK | fs.constants.W_OK);
         // read file and fetch the data from the file
         fs.readFile(configFilePath, 'utf8', (err, data) => {

            if(!data){
                askForAllTheDetails = true;
            }else{
                var fileConfigObject = JSON.parse(data);

                console.log(fileConfigObject);
            }

            if (askForAppConfigAllTheDetails) {
                arrQues = [
                    {
                        type: 'input',
                        name: 'port',
                        message: "Please provide the application config details.\nPort:"
                    },
                    {
                        type: 'input',
                        name: 'apiFolderName',
                        message: "Api Folder Name:"
                    },
                    {
                        type: 'list',
                        name: 'nodeEnviroment',
                        message: "Node Enviroment:",
                        choices: ['development','production'],
                    },
                   
                ]
            }
            if(askForDbConfigAllTheDetails)
            {
                arrQues = [
                    {
                        type: 'input',
                        name: 'username',
                        message: "Please provide the DataBase config details.\n UserName : "
                    },
                    {
                        type: 'input',
                        name: 'password',
                        message: "Password : "
                    },
                    {
                        type: 'input',
                        name: 'database',
                        message: "DataBase : "
                    },
                    {
                        type: 'input',
                        name: 'host',
                        message: "host:"
                    },
                    {
                        type: 'input',
                        name: 'dialect',
                        message: "dialect:"
                    },
                   
                ]
            }
            if(askForAwsS3ConfigAllTheDetails)
            {
                arrQues = [
                    {
                        type: 'input',
                        name: 'awsS3BucketName',
                        message: "Please provide the  AWS s3 config details.\n BucketName:"
                    },
                    {
                        type: 'input',
                        name: 'awsS3AccessId',
                        message: "S3 Bucket Access Id:"
                    },
                    {
                        type: 'input',
                        name: 'awsS3SecretKey',
                        message: "S3 Bucket Secret Key:"
                    },
                   
                ]
            }
            if(askForSecretKeyConfigAllTheDetails)
            {
                arrQues = [
                    {
                        type: 'input',
                        name: 'jwtAccessTokenSecretKey',
                        message: "Please provide the Secret Key config details.\n JWT Access Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'jwtRefreshTokenSecretKey',
                        message: "JWT Refresh Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'cookieSecretKey',
                        message: "Cookie Secret Key:"
                    },
                   
                ]
            }
            if(askForAllTheDetails){
                arrQues = [
                    {
                        type: 'input',
                        name: 'port',
                        message: "Please provide the application config details.\nPort:"
                    },
                    {
                        type: 'input',
                        name: 'apiFolderName',
                        message: "Api Folder Name:"
                    },
                    {
                        type: 'list',
                        name: 'nodeEnviroment',
                        message: "Node Enviroment:",
                        choices: ['development','production'],
                    },{
                        type: 'input',
                        name: 'username',
                        message: "Please provide the DataBase config details.\n UserName : "
                    },
                    {
                        type: 'input',
                        name: 'password',
                        message: "Password : "
                    },
                    {
                        type: 'input',
                        name: 'database',
                        message: "DataBase : "
                    },
                    {
                        type: 'input',
                        name: 'host',
                        message: "host:"
                    },
                    {
                        type: 'input',
                        name: 'dialect',
                        message: "dialect:"
                    },
                    {
                        type: 'input',
                        name: 'jwtAccessTokenSecretKey',
                        message: "Please provide the Secret Key config details.\n JWT Access Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'jwtRefreshTokenSecretKey',
                        message: "JWT Refresh Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'cookieSecretKey',
                        message: "Cookie Secret Key:"
                    }, {
                        type: 'input',
                        name: 'BucketName',
                        message: "Please provide the  AWS s3 config details.\n BucketName:"
                    },
                    {
                        type: 'input',
                        name: 'accessId',
                        message: "S3 Bucket Access Id:"
                    },
                    {
                        type: 'input',
                        name: 'secretkey',
                        message: "S3 Bucket Secret Key:"
                    },
                   
                ]
            } 
            resolve(arrQues);


         });


    } catch (error) {
        throw new Error("permission denied"); // throw an err to ask for the read/write permission
    }
});


var askFortheDetails = async (_queArray) => {

    // get the values from user  configuration.
    await pkg.prompt(_queArray).then(objResponse => {      
        for (const akey in objResponse) {
            Object.keys(configObject).forEach(function (mainkey) {
                Object.keys(configObject[mainkey]).forEach(function (key) {
                    if (Object.hasOwnProperty.call(objResponse, key)) {
                        configObject[mainkey][key] = objResponse[key];
                    }
                });
            });
        }

        console.log(configObject);
        console.log(chalk.green("Config File Generated."));
    })

    fs.access(configObject.AppConfig.apiFolderName, async (err) => { 
        if (err) {
        // get the api endpoint from user
    fs.mkdir(configObject.AppConfig.apiFolderName, async (err2) => {
        if (err2) {
            console.log(err2);
        }
    });
        }
    });
    



    var json = JSON.stringify(configObject);
    const textContent = json;
    const position = 0; // Starting position in file
    fs.writeFileSync(configFilePath, textContent);
}

var getCustomCommand = new Promise((resolve,reject) => {
    let customCommand = {};
    if(fs.existsSync(customCommandFolder)){
        const commands = fs.readdirSync(customCommandFolder);
        commands.forEach(command => {
            Object.assign(customCommand, {[command]:customCommandFolder+'/'+command});
        });
    }
    resolve(customCommand);
});


var addCustomCommand = async (_commandObject) => {

    var publicAccessConfig = '';

    fs.accessSync(packagePath, fs.constants.R_OK | fs.constants.W_OK);
        // read file and fetch the data from the file
        fs.readFile(packagePath, 'utf8', (err, data) => {

            if (data) {
            
                var currentPackageObject = JSON.parse(data);

                 binObject =  currentPackageObject?.bin;

                if(currentPackageObject?.bin)
                {
                    Object.keys(currentPackageObject.bin).forEach(function (key) {

                        Object.keys(_commandObject).forEach(function (mainkey) {
                            var pair = {[mainkey]:path.join(projectCustomCommandFolderName,mainkey)};

                            binObject = {...binObject, ...pair};
                    
                        });
                    }); 

                    

                    
                
                }else{
                    Object.keys(_commandObject).forEach(function (mainkey) {    

                      
                        var pair = {[mainkey]:path.join(projectCustomCommandFolderName,mainkey)};

                        binObject = {...binObject, ...pair};
                  

                      
                
                    });
                  
                } 
                
              
                    Object.assign(currentPackageObject, {[projectCustomCommandFolderName]:binObject});
                    Object.assign(currentPackageObject, {"publishConfig": { "access": "public" }});

              

                    var json = JSON.stringify(currentPackageObject);
                    const textContent = json;
                    const position = 0; // Starting position in file
                    fs.writeFileSync(packagePath, textContent);
                    
            }
    });

    

    
}


/* Important Functions #END#*/


/* Post Install Setup #START#*/
console.log(warning("Post Installing Setup Starting.............."));
(async() => {
 
await checkForConfigFileAvailability.then(async (questionArray) =>{

    if (questionArray && questionArray.length > 0) {
        askFortheDetails(questionArray);
    }

    getCustomCommand.then((command) => {
        
        if(Object.keys(command).length > 0)
        {
            addCustomCommand(command);
        }
    }).then(()=>{
        exec("npm link");
    })
   
    await console.log(success("Post Installing Setup Ending................"));
});
})();

/* Post Install Setup #END#*/