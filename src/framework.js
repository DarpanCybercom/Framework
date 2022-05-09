const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { exec }   = require("child_process");
/* 
const fse = require('fs-extra');
const chalk  = require("chalk");
 */


/* Console Color Scheme  #START# */

/* const success = chalk.green;
const error = chalk.red;
const warning = chalk.yellow; */

/* Console Color Scheme #END# */


/* Custom Command Import #START# */

/* const { addModule } = require('./addModule');
const { addAuth } = require('./addAuth');
const { addModel } = require('./addModel');
const { addFileUpload } = require('./addFileUpload');
 */
const { help } = require('./help');
const { init } = require('./init'); 

/* Custom Command Import #END# */



var parseArgumentsIntoOptions =  async function (rawArgs){
    const args = arg(
        { 
            '--init': Boolean,
            '--help': Boolean,
            '-i' : '--init',
            '-h' : '--help'
        },
        {
        argv : rawArgs.slice(2),
        }
    );
    
    return {
        freshInstall : args['--init'] || false,
        needHelp : args['--help'] || false,
        command : args._[0],
        commandArg: args._[1]
    }
}






module.exports.cli = async (args) => {

    

    let CustomCommand = await parseArgumentsIntoOptions(args);
    let Command = CustomCommand.command;
    let CommandOptions = CustomCommand.commandOptions;
    let CommandArg = CustomCommand.commandArg;
    

    if (CustomCommand.freshInstall) {
        
        let FolderName = Command;
        init(FolderName);     

    }else{

        if (CustomCommand.needHelp) {

            help();
        
        }else{

            switch (Command) {

                case "addModule":
                        addModule(CommandArg);
                    break;

                case "addAuth":
                        addAuth();
                    break;      

                case "addModel":
                        addModel(CommandArg);
                    break;
                
                case "addFileUpload":
                        addFileUpload(CommandArg);
                    break;
                    
                default:
                        help();
                    break;
            }
        }
    }   
};
    