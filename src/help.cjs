const TerminalLog = require("./colors"); 

module.exports.help = async (arg1) => {

    TerminalLog.info("Frame Work Help");

    TerminalLog.info("\n");

    TerminalLog.log("1) init - Initialize Your Project");
    TerminalLog.log("\tOptions : --init || -i");
    TerminalLog.log("\t if you want to initialize your project in Current Folder then use --init or -i");
    TerminalLog.log("\t Example : framework --init || -i"); 
    TerminalLog.log("\t if you want to initialize your project in any other folder then use --init <foldername> -i <folderName>");
    TerminalLog.log("\t Example : framework --init myproject || -i myproject");
    TerminalLog.info("\n");

    TerminalLog.log("2) addModule - Add Module");
    TerminalLog.log("\tOptions : addModule <Module Name>");
    TerminalLog.log("\t Example : framework addModule <Module Name>");
    TerminalLog.info("\n");

    TerminalLog.log("3) addModel - Add Model");
    TerminalLog.log("\tOptions : addModel <Model Name>");
    TerminalLog.log("\t Example : framework addModel <Model Name>");
    TerminalLog.info("\n");

    TerminalLog.log("4) addFileUpload - Add File Upload Function for Api ");
    TerminalLog.log("\tOptions : addFileUpload"); 
    TerminalLog.log("\t Example : framework addFileUpload");
    TerminalLog.info("\n");

    

    
};