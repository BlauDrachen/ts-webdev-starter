/* This script generates mock api data for local development. */

// tslint:disable:no-console
import chalk from "chalk";
import Chance from "chance";
import faker from "faker";
import fs from "fs";
import jsf from "json-schema-faker";
import * as schema from "./mockSchema.json";

// Setup JSF with chance.js or faker.js support
jsf.extend("faker", () => faker);
jsf.extend("chance", () => new Chance(Math.random));

// JSF Options Setup
jsf.option({
  alwaysFakeOptionals: true,
  resolveJsonPath: true
  // optionalsProbability: 0.5
});

// Process schema with chance, faker, and then output mock data
jsf.resolve(schema).then((result) => {
  const json = JSON.stringify(result, null, 2);

  // Write output data to db.json file
  fs.writeFile("./src/api/db.json", json, (err: NodeJS.ErrnoException) => {
    if (err) {
      return console.log(chalk.red(`Error output: ${err}`));
    } else {
      console.log(chalk.green("Mock data generated."));
    }
  });
});
