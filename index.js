import pkg from 'express';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import inquirer from 'inquirer';


/* Global Varible for CMD Text Color #START */
        global.suc = chalk.green;
        global.err = chalk.red;
        global.war = chalk.yellow;
/* Global Varible for CMD Text Color #END */





const app = pkg();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
res.send('Hello World!')
})
  
app.listen(port, () => {
console.log(war(`Example app listening on port ${port}`))
})