import { copyFile, getTemplateDir } from "../../../utils/file-manager.js";
import { PROJECT_CONSTANTS } from "../../../stack-options.js";
import { errorHandler } from "../../../utils/errorHandler.js";

/**
 *  find the closest matching template for the given project entries
 * @param {*} projectEntries
 * @returns
 */
function findClosestMatchingTemplate(projectEntries) {
  let bestMatch = null;
  let highestScore = 0;

  for (const [templateKey, templateVersions] of Object.entries(
    PROJECT_CONSTANTS.templates.backend,
  )) {
    for (const [versionKey, template] of Object.entries(templateVersions)) {
      let score = template.matches.reduce((acc, entry) => {
        return acc + (projectEntries.includes(entry) ? 1 : 0);
      }, 0);

      if (score > highestScore) {
        highestScore = score;
        bestMatch = template;
      }
    }
  }

  return bestMatch;
}

export async function createExpressJsTypescriptProject({
  framework,
  database,
  orm,
  language,
  destinationPath,
  spinner,
}) {
  try {
    // mongoose and mongodb are the only supported databases for typescript that's why they are hardcoded
    let projectEntries = [
      framework.toLowerCase(),
      "mongoose",
      "mongodb",
      language.toLowerCase(),
    ];

    spinner.start("Getting template ...");

    // get template that matches the project entries
    let matchedTemp = findClosestMatchingTemplate(projectEntries);

    if (!matchedTemp) {
      spinner.fail("No template found, please try again");
      return;
    }

    spinner.succeed();
    spinner.start("Unpacking template ...");

    let templateDir = getTemplateDir(matchedTemp.dir);

    // copy project files
    copyFile(templateDir, destinationPath);

    // spinner.succeed();
  } catch (error) {
    errorHandler.handleError(error);
  }
}
