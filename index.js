const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const chalk = require('colors/safe');
const path = require('path');
const appConfig = require('./config/appConfig.json');

const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

var portscanner = require("portscanner"); 
var csrf = require('csurf');


CorePath = __dirname;
ModuleFolderName = appConfig.AppConfig.apiFolderName;
var PORT = process.env.PORT || 3000;

require("./core/globalVariable");


const migration = require('./core/db/migrations');
const Routes = require("./core/routes");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
/* app.use(csrf({cookie: true })); */

app.use(Routes);



(async () => {
	const pendingMigrations = await migration.pending();

	if(pendingMigrations.length > 0)
		{

		pendingMigrations.forEach(migration => {

			console.log(chalk.yellow(migration.name));	
		
		});

		readline.question(
					chalk.yellow('Foloowing Migrartion Are Pending Are you want to migrate ? (y/n)' ),
					async (answer) => {	
							if(answer === 'y' || answer === 'Y' )
							{
								await migration.up();
								getListen(PORT);
							}else{
								getListen(PORT);
							}

						readline.close();
					}
		);
		}else{
			getListen(PORT);
		}
})();

function getListen(envport) {

	app.listen(envport, () =>
		console.log(
			chalk.green(`App listening on port: http://localhost:${envport}`)
		)
	)
	.on("error", (err) => {
		if (err["code"] === "EADDRINUSE") {
			console.log(chalk.yellow(envport + " Port Not Available."));
		}
		
		envport++;

		portscanner.findAPortNotInUse(
		envport,
		3020,
		"localhost",
		function (error, port) {
			console.log("AVAILABLE PORT AT: " + port);
			readline.question(
				chalk.yellow(
					port + ` Port is Available Do you Want to Use This Port?(y/n)`
				),
				(answer) => {
					if (answer == "y" || answer == "Y") {
						app.listen(port, () =>
							console.log(
								chalk.green(`App listening on port: http://localhost:${port}`)
							)
						);
					} else {
						process.exit(0);
					}
					readline.close();
				}
			);

		});

	});

}