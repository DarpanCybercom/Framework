const { execSync }  = require('child_process');
const TerminalLog = require('./colors');


module.exports.init =  async (arg) => {

  TerminalLog.info("Initializing Project.....");
  
  try {
      var FolderName = arg;
      
      if(FolderName == undefined) FolderName = ".";
      
      //TerminalLog.debug("Creating Folder: " + FolderName);

      var gitCommand = "git clone -b main --single-branch https://github.com/DarpanCybercom/Framework.git " + FolderName;

      //TerminalLog.debug("Executing Command: " + gitCommand);

      execSync(gitCommand, (error, stdout, stderr) => {
        if (error) {
         return;
        }
        //TerminalLog.debug(`stdout: ${stdout}`);
        //TerminalLog.debug(`stderr: ${stderr}`);
          
      
      });
      
      TerminalLog.success("Project Initialized Successfully");
    

    } catch (err) {
      if(FolderName == ".") FolderName = "Current";
      TerminalLog.error("Error: "+FolderName+" Folder Must Be Empty.");
    }
};