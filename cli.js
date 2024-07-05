#!/usr/bin/env node

import figlet from "figlet";
import { program } from "commander";
import chalk from "chalk";
import useGradient from "./src/core/utils/useGradient.js";
import { createBackendProject } from "./src/core/create-backend-project.js";
import {
  promptBackendFramework,
  promptDatabase,
  promptFrontendFramework,
  promptFrontendLanguage,
  promptInitDatabase,
  promptOrm,
  promptProjectName,
  promptProjectStack,
  promptDependenciesInstall,
  promptBackendLanguage,
} from "./src/core/prompts.js";
import { createFrontendProject } from "./src/core/create-frontend-project.js";
import {
  checkForUpdate,
  validateProjectName,
} from "./src/core/utils/helper.js";
import { sendQueuedStats } from "./src/core/stat.js";

const toolName = "StartEase";
const jsBackendStacks = ["expressjs", "nestjs"];

program.version("1.0.0").description("StartEase CLI");

program
  .description("Scaffold a new project with StartEase")
  .action(async () => {
    await startProject();
  });

program.parse(process.argv);

async function startProject() {
  let framework;
  let projectName;
  let projectStack;
  let initDB;
  let database;
  let orm;
  let language;
  let installDependencies;

  const initialMsg = `Simplify Project Setup with the. ${chalk.green(
    toolName,
  )} CLI Tool.`;

  // check for update
  await checkForUpdate();

  // render cli title
  renderTitle();
  console.log(chalk.white(initialMsg));

  projectName = await promptProjectName();
  validateProjectName(projectName);

  projectStack = await promptProjectStack();

  // process sending of stats in background
  await sendQueuedStats();

  /**
   * start prompts
   */
  if (projectStack === "frontend") {
    language = await promptFrontendLanguage();
    framework = await promptFrontendFramework();

    if (framework === "html-x-css-x-javascript") {
      return await createFrontendProject(projectName, framework, "javascript");
    }

    return await createFrontendProject(projectName, framework, language);
  } else if (projectStack === "backend") {
    language = await promptBackendLanguage();
    framework = await promptBackendFramework(language);

    // note: this is done because there is no other database and orm for typescript except mongoose and mongodb
    // the default template for typescript is express-ts, and it ships with mongoose and mongodb by default
    if (language !== "typescript") {
      initDB = await promptInitDatabase();

      if (initDB) {
        database = await promptDatabase(framework);

        if (jsBackendStacks.includes(framework)) {
          orm = await promptOrm(database);
        }
      }
    }
    installDependencies = await promptDependenciesInstall();

    await createBackendProject({
      projectName,
      framework,
      database,
      orm,
      installDependencies,
      language,
    });
  }
}

/**
 * Render cli title
 */
function renderTitle() {
  const figletConfig = {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  };

  useGradient({
    title: figlet.textSync("StartEase", figletConfig),
  });
}
