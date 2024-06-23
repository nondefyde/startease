import {
  NEST_MONGOOSE_PACKAGE,
  NestjsPackageJsonTemplate,
} from "../../../../templates/backend/nestjs/base/nestjs-package-json.js";
import {
  copyFile,
  createAndUpdateFile,
  getTemplateDir,
  updateFileContent,
  writeToFile,
} from "../../../utils/file-manager.js";
import { AppModuleContent } from "../../../../templates/backend/nestjs/base/app-module.js";
import { ENVIRONMENT_TEMPLATE } from "../../../../templates/backend/nestjs/base/environment.js";
import {
  MongodbDatabaseConfig,
  MongodbSchema,
} from "../../../../templates/backend/nestjs/base/databases.js";

export async function createNestjsProject({
  destinationPath,
  database,
  orm,
  spinner,
}) {
  let appModules = "";
  let appModuleImports = "";
  let packageJson = NestjsPackageJsonTemplate;
  let environmentInterface = "";
  let environmentContent = "";

  // copy nestjs template to directory
  copyFile(getTemplateDir("backend/nestjs/nestjs-temp"), destinationPath);

  // update app module file content
  writeToFile(`${destinationPath}/src/app.module.ts`, AppModuleContent);

  // add environment file
  writeToFile(
    `${destinationPath}/src/common/configs/environment.ts`,
    ENVIRONMENT_TEMPLATE,
  );

  if (database) {
    spinner.succeed();
    spinner.start("Adding Database Module ...");

    switch (database) {
      case "mongodb":
        switch (orm) {
          case "mongoose":
            // write db config
            createAndUpdateFile(
              `${destinationPath}/src/module/v1/database/database.module.ts`,
              MongodbDatabaseConfig,
            );

            // create sample schema file for db
            createAndUpdateFile(
              `${destinationPath}/src/module/v1/database/sample.schema.ts`,
              MongodbSchema,
            );

            // add mongoose dependencies
            packageJson.dependencies = {
              ...packageJson.dependencies,
              ...NEST_MONGOOSE_PACKAGE.dependencies,
            };

            // update environment
            environmentInterface += `\nDB: {
    URL: string;}`;
            environmentContent += `\n  DB: {
    URL: process.env.DB_URL,}`;

            // update app module
            appModules += "DatabaseModule";
            appModuleImports +=
              'import { DatabaseModule } from "./module/v1/database/database.module";';
            break;
          default:
            packageJson.dependencies = {
              ...packageJson.dependencies,
              ...NestjsPackageJsonTemplate.dependencies,
            };
            break;
        }
        break;
    }
  }

  // update app module
  updateFileContent(`${destinationPath}/src/app.module.ts`, AppModuleContent, {
    new_modules_path: appModuleImports,
    new_modules: appModules,
  });

  // update environment config file
  updateFileContent(
    `${destinationPath}/src/common/configs/environment.ts`,
    ENVIRONMENT_TEMPLATE,
    {
      environment_interface: environmentInterface,
      environment_content: environmentContent,
    },
  );

  // update packageJsonFile
  createAndUpdateFile(
    `${destinationPath}/package.json`,
    JSON.stringify(packageJson, null, "  "),
  );
}
