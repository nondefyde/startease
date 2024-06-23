import { ExpressJsPackageJsonTemplate } from "../../../../templates/backend/expressjs/base/package-json.js";
import {
  copyFile,
  createAndUpdateFile,
  createFolder,
  getTemplateDir,
  updateFileContent,
  writeToFile,
} from "../../../utils/file-manager.js";
import { EXPRESSJS_SERVER_TEMPLATE } from "../../../../templates/backend/expressjs/base/server.js";
import {
  ExpressJsMongodbMongooseConnectionTemplate,
  ExpressJsMongoDbMongooseSampleSchema,
} from "../../../../templates/backend/expressjs/base/database.js";
import { ExpressJsEnvironmentTemplate } from "../../../../templates/backend/expressjs/base/config.js";

export async function createExpressJsJavascriptProject(
  framework,
  database,
  orm,
  destinationPath,
  spinner,
) {
  try {
    let database_config = "";
    let database_config_import = "";
    let additional_environment_variables = "";
    let packageJson = ExpressJsPackageJsonTemplate;

    console.log({ framework, database, orm, destinationPath });

    // copy expressjs template to directory
    copyFile(
      getTemplateDir("backend/expressjs/expressjs-temp"),
      destinationPath,
    );

    console.log("check 1");

    // add server.js file
    writeToFile(`${destinationPath}/src/server.js`, EXPRESSJS_SERVER_TEMPLATE);

    if (database) {
      spinner.succeed();
      spinner.start("Adding Database Module ...");

      // create schema folder
      createFolder(`${destinationPath}/src/modules/schemas`);

      switch (database) {
        case "mongodb":
          switch (orm) {
            case "mongoose":
            default:
              // create db config file
              createAndUpdateFile(
                `${destinationPath}/src/common/config/database.js`,
                ExpressJsMongodbMongooseConnectionTemplate,
              );

              // create sample schema file
              createAndUpdateFile(
                `${destinationPath}/src/modules/schemas/sample.schema.js`,
                ExpressJsMongoDbMongooseSampleSchema,
              );

              // update database config for server js file
              database_config_import = `import { connectDb } from "./common/config/database.js";`;
              database_config = ` connectDb()`;

              // update packageJson
              packageJson.dependencies = {
                ...packageJson.dependencies,
                mongoose: "^7.5.2",
              };

              // update db config
              additional_environment_variables += `DB: {
                    URL: process.env.DB_URL
                }`;
          }
      }
    }

    // update server template
    updateFileContent(
      `${destinationPath}/src/server.js`,
      EXPRESSJS_SERVER_TEMPLATE,
      {
        database_config,
        database_config_import,
      },
    );

    // add and update config file
    updateFileContent(
      `${destinationPath}/src/common/config/environment.js`,
      ExpressJsEnvironmentTemplate,
      { additional_environment_variables },
    );

    // add package json file
    createAndUpdateFile(
      `${destinationPath}/package.json`,
      JSON.stringify(ExpressJsPackageJsonTemplate, null, "  "),
    );
  } catch (error) {
    console.log(
      `Error: There was an error creating the project, please try again`,
    );
  }
}
