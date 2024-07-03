import { copyFile, getTemplateDir } from "../../../utils/file-manager.js";

export async function createVueJavascriptProject({
  destinationPath,
  spinner,
  language,
}) {
  // copy project files
  copyFile(
    getTemplateDir(`frontend/vuejs/vuejs-javascript-temp`),
    destinationPath,
  );

  // success message
  spinner.succeed(
    `Frontend - VueJs project with ${
      language.charAt(0).toUpperCase() + language.slice(1)
    } created successfully! : ${destinationPath}`,
  );
}
