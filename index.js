import pkg from 'express';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import inquirer from 'inquirer';
import fs from "fs";

const appConfigFile = './config/appConfig.json';


if(!fs.existsSync(appConfigFile))
{
console.log(err('Application Config File Is Not Found'));
}

import appConfig from "./config/appConfig.json" assert {type: "json"};


/* Global Varible for CMD Text Color #START */
        global.suc = chalk.green;
        global.err = chalk.red;
        global.war = chalk.yellow;
/* Global Varible for CMD Text Color #END */

/* AppConfig As Global Variable  #START */

        global.appConfig = appConfig;
/* AppConfig As Global Variable  #END */

var port = appConfig.AppConfig.port;
const app = pkg();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(appConfig.SecretKeyConfig.cookieSecretKey));
app.use(pkg.json());




app.get('/', (req, res) => {
res.send('Hello World!')
})
  



app.listen(port, () => {
console.log(war(`Example app listening on port ${port}`))
})