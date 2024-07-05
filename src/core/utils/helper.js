import shell, { exit } from "shelljs";
import isOnline from "is-online";
import axios from "axios";
import semver from "semver";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "..", "..", "package.json"),
    "utf8",
  ),
);

/**
 * validate project name
 */
export function validateProjectName(projectName) {
  if (projectName === "") {
    console.log(`Project name can't be empty.`);
    exit();
  }

  if (!isNaN(parseInt(projectName.charAt(0)))) {
    console.log(`Project name can't start with a number.`);
    exit();
  }
}

/**
 * check user is connected to internet
 */
export async function isConnectedToInternet() {
  return await isOnline();
}

/**
 * This function is used to process the installation of dependencies for a given project.
 * It first checks if the user has an active internet connection. If the user is online,
 * it changes the current working directory to the destination path of the project.
 * Depending on the framework used in the project, it executes different commands.
 * If the user is not online, it logs a message and aborts the installation process.
 *
 * @async
 * @function processDependenciesInstall
 * @param {string} framework - The framework used in the project.
 * @param {string} destinationPath - The path where the project is located.
 * @returns {Error} If the user is not connected to the internet.
 */
export async function processDependenciesInstall(framework, destinationPath) {
  // check user has internet connection
  if (await isConnectedToInternet()) {
    shell.cd(`${destinationPath}`);
    switch (framework) {
      case "expressjs":
        shell.exec(`npm install`);
        shell.exec(`npm run format:fix`);
        shell.cd("-");
        break;

      case "nestjs":
        shell.exec(`npm install`);
        shell.exec(`npm run format`);
        shell.cd("-");
        break;

      default:
        break;
    }
  } else {
    console.log(
      `You don't have an active internet connection, aborting dependency install`,
    );
  }
}

export async function checkForUpdate() {
  try {
    const response = await axios.get(
      "https://registry.npmjs.org/startease-cli",
    );
    const latestVersion = response.data["dist-tags"].latest;
    const currentVersion = packageJson.version;

    if (semver.gt(latestVersion, currentVersion)) {
      console.log(
        chalk.yellow(
          `🚀 Exciting news! StartEase v${latestVersion} is now available!`,
        ),
      );
      console.log(chalk.cyan(`Upgrade now: npm install -g startease-cli`));
      console.log(
        chalk.blue(`Learn more: https://github.com/JC-Coder/startease`),
      );
    }
  } catch (error) {
    // don't do anything
    // the catch is added to prevent obstructing user workflow
  }
}
