import { addGitignore } from "./utils/file-manager.js";
import path from "path";
import ora from "ora";
import { processDependenciesInstall } from "./utils/helper.js";
import { sendStat } from "./stat.js";
import { errorHandler } from "./utils/errorHandler.js";
import { createExpressJsJavascriptProject } from "./create-projects-handlers/backend/expressjs/createExpressJsJavascript.js";
import { createNestjsProject } from "./create-projects-handlers/backend/nestjs/createNestjsProject.js";
import { createDjangoProject } from "./create-projects-handlers/backend/django/createDjangoProject.js";
import { createExpressJsTypescriptProject } from "./create-projects-handlers/backend/expressjs/createExpressJsTypescript.js";

/**
 * function to create backend projects
 */

export async function createBackendProject({
  projectName,
  framework,
  database,
  orm,
  installDependencies,
  language,
}) {
  try {
    const spinner = ora("Creating Project ...").start();

    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`,
    );

    switch (language.toLowerCase()) {
      case "javascript":
        await createExpressJsJavascriptProject({
          projectName,
          framework,
          database,
          orm,
          destinationPath,
          spinner,
        });
        break;
      case "typescript":
        switch (framework) {
          case "expressjs":
            await createExpressJsTypescriptProject({
              projectName,
              framework,
              database,
              orm,
              destinationPath,
              spinner,
              language,
            });
            break;
          case "nestjs":
            await createNestjsProject({
              destinationPath,
              database,
              orm,
              spinner,
              language,
              framework,
            });
            break;
          default:
            spinner.fail("Invalid framework");
            break;
        }
        break;
      case "python":
        switch (framework) {
          case "django":
            await createDjangoProject({
              projectName,
              destinationPath,
              database,
              spinner,
            });
            break;
          default:
            spinner.fail("Invalid framework");
            break;
        }
        break;
      default:
        spinner.fail("Invalid language");
        break;
    }

    // switch (framework) {
    //   case "expressjs":
    //     await createExpressJsJavascriptProject({
    //       projectName,
    //       framework,
    //       database,
    //       orm,
    //       destinationPath,
    //       spinner,
    //     });
    //     break;
    //   case "nestjs":
    //     await createNestjsProject({
    //       destinationPath,
    //       database,
    //       orm,
    //       spinner,
    //     });
    //     break;
    //   case "django":
    //     await createDjangoProject({
    //       projectName,
    //       destinationPath,
    //       database,
    //       spinner,
    //     });
    //     break;
    //   default:
    //     spinner.fail("Invalid framework");
    //     break;
    // }

    addGitignore({ framework, destinationPath });

    // process dependencies install
    if (installDependencies) {
      spinner.succeed();
      spinner.start("Installing dependencies ...");
      await processDependenciesInstall(framework, destinationPath);
    }

    // success message
    spinner.succeed();
    spinner.succeed(
      `Backend project created successfully! : ${destinationPath}`,
    );

    // send stat
    await sendStat("startease", framework);
  } catch (e) {
    errorHandler.handleError(e);
  }
}
