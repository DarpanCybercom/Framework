const  arg  = require('arg');
const inquirer  = require('inquirer');
const fs = require("fs");
const path = require("path");
const  { exec }   = require("child_process");
const TerminalLog = require('./colors');

/* Custom Command Import #START# */
const { help } = require('./help');
const { init } = require('./init'); 
const { addModule } = require('./addModule');
const { addAuth } = require('./addAuth');
const { addModel } = require('./addModel');
const { addFileUpload } = require('./addFileUpload');

/* Custom Command Import #END# */



var parseArgumentsIntoOptions =  async function (rawArgs){
    const args = arg(
        { 
            '--init': Boolean,
            '--help': Boolean,
            '--withTable': Boolean,
            '-i' : '--init',
            '-h' : '--help',
            '-t' : '--withTable',

        },
        {
        argv : rawArgs.slice(2),
        }
    );
    
    return {
        freshInstall : args['--init'] || false,
        needHelp : args['--help'] || false,
        withTable : args['--withTable'] || false,
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
                        addModule(CustomCommand.withTable,CommandArg);
                    break;

                case "addAuth":
                        addAuth();
                    break;      

                case "addModel":
                        addModel(CommandArg);
                    break;
                
                case "addFileUpload":
                        addFileUpload();
                    break;
                    
                default:
                        help();
                    break;
            }
        }
    }    
};
    