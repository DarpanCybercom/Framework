const  { exec }   = require("child_process");

module.exports.init = async (arg) => {

    let FolderName = arg;

    if(FolderName){

       await exec("git clone -b main --single-branch git@DarpanCybercom:DarpanCybercom/NodeFramework.git " + FolderName);
    
    }
    
    await exec("git clone -b main --single-branch git@DarpanCybercom:DarpanCybercom/NodeFramework.git .");

    
};