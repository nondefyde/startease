import { addGitignore } from "./utils/file-manager.js";
import path from "path";
import ora from "ora";
import { sendStat } from "./stat.js";
import { createReactProject } from "./create-projects-handlers/frontend/react/base.js";
import { createVueProject } from "./create-projects-handlers/frontend/vue/base.js";

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

    // return;

    // if (framework === "reactjs") {
    //   spinner.start("Creating ReactJS project ...");
    //   //   copy files based on the language chosen
    //   switch (language) {
    //     case "javascript":
    //       copyFile(
    //         getTemplateDir(`frontend/reactjs/react-javascript-temp`),
    //         destinationPath,
    //       );
    //       break;
    //     case "typescript":
    //       copyFile(
    //         getTemplateDir(`frontend/reactjs/react-typescript-temp`),
    //         destinationPath,
    //       );
    //       break;
    //     default:
    //       break;
    //   }
    //   addGitignore(framework, destinationPath);

    //   // success message
    //   spinner.succeed(
    //     `Frontend - ReactJS project with ${
    //       language.charAt(0).toUpperCase() + language.slice(1)
    //     } created successfully! : ${destinationPath}`,
    //   );
    // } else if (framework === "vuejs") {
    //   spinner.start("Creating VueJS project ...");
    //   switch (language) {
    //     case "javascript":
    //       copyFile(
    //         getTemplateDir(`frontend/vuejs/vuejs-javascript-temp`),
    //         destinationPath,
    //       );
    //       break;
    //     case "typescript":
    //       copyFile(
    //         getTemplateDir(`frontend/vuejs/vuejs-typescript-temp`),
    //         destinationPath,
    //       );
    //       break;
    //     default:
    //       break;
    //   }
    //   addGitignore(framework, destinationPath);

    //   // success message
    //   spinner.succeed(
    //     `Frontend - VueJs project with ${
    //       language.charAt(0).toUpperCase() + language.slice(1)
    //     } created successfully! : ${destinationPath}`,
    //   );
    // } else if (framework === "html-x-css-x-javascript") {
    //   spinner.start("Creating HTML, CSS, and JavaScript project ...");

    //   copyFile(getTemplateDir(`frontend/html-css-javascript`), destinationPath);

    //   // success message
    //   spinner.succeed(
    //     `Frontend - HTML, CSS, and JavaScript project created! : ${destinationPath}`,
    //   );
    // }

    // update stat
    sendStat("startease", framework).then(() => {});
  } catch (e) {
    console.log(`Error Creating Frontend Project: ${e}`);
    console.error(e);
  }
}
