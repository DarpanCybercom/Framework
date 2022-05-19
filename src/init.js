const { exec }  = require('child_process');

module.exports.init = async (arg) => {

    console.log("Project Intializing.....");

    let FolderName = arg;
    
    if(FolderName){
        
        console.log("Project Creating in "+ FolderName + " Folder....."); 
        
        exec('git clone -b main --single-branch git@github.com:DarpanCybercom/Framework.git ' + FolderName, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }

            exec('npm i', (error, stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  return;
                }

                console.log('NPM Pacakages Installing');
              });
            
            console.log('Project Intialied');
            
            
          });

    }else{
        console.log("Project Creating in Folder.....");

        exec('git clone -b main --single-branch git@github.com:DarpanCybercom/Framework.git .', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }

            exec('npm i', (error, stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  return;
                }

                console.log('NPM Pacakages Installing');
              });

              console.log('Project Intialied');
          });
    }    
};