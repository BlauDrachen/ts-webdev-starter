// tslint:disable:no-console
import chalk from "chalk";
import webpack from "webpack";
import config from "../../webpack.config.prod";

console.log(chalk.blue("Generating minified bundle for production. This will take a moment..."));

// TODO: remove ts-ignore and ensure object typing is correct
// @ts-ignore
webpack(config).run((err, stats) => {
  // If a fatal error occurs stop at this point.
  if (err) {
    console.log(chalk.red(`${err}`));
    return 1;
  }

  // convert stats object to JSON
  const jsonStats = stats.toJson();

  // Check for Errors
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map((error) => console.log(chalk.red(error)));
  }

  // Check for warnings
  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow("Webpack generated the following warnings: "));
    jsonStats.warnings.map((warning) => console.log(chalk.yellow(warning)));
  }

  // Output the remainder of the output
  console.log(`Webpack Bundle Statistics: ${stats}`);
  console.log("The application has finished compiling and has been written to the output directory /dist.");
  return 0;
});
