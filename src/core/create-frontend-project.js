import { addGitignore } from "./utils/file-manager.js";
import path from "path";
import ora from "ora";
import { sendStat } from "./stat.js";
import { createReactProject } from "./create-projects-handlers/frontend/react/base.js";
import { createVueProject } from "./create-projects-handlers/frontend/vue/base.js";
import { createHtmlCssJsProject } from "./create-projects-handlers/frontend/html x css x js/createHtmlCssJs.js";
import { errorHandler } from "./utils/errorHandler.js";

/**
 * function to create frontend projects
 * @param {string} framework
 * @param {string} projectName
 * @param {string} language
 */
export async function createFrontendProject(projectName, framework, language) {
  try {
    const spinner = ora("Creating Project ...").start();

    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`,
    );

    switch (framework) {
      case "reactjs":
        await createReactProject({
          framework,
          language,
          destinationPath,
          spinner,
        });
        break;
      case "vuejs":
        await createVueProject({
          framework,
          language,
          destinationPath,
          spinner,
        });
        break;
      case "html-x-css-x-javascript":
        await createHtmlCssJsProject({
          framework,
          language,
          destinationPath,
          spinner,
        });
        break;
      default:
        console.log(
          "Invalid project configuration, please check the framework and language parameters",
        );
        break;
    }

    addGitignore({ framework, destinationPath });

    // update stat
    sendStat("startease", framework).then(() => {});
  } catch (e) {
    errorHandler.handleError(e);
  }
}
