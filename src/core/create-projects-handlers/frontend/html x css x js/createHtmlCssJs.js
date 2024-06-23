import { copyFile, getTemplateDir } from "../../../utils/file-manager.js";

export async function createHtmlCssJsProject({ destinationPath, spinner }) {
  // start spinner
  spinner.start("Creating HTML, CSS, and JavaScript project ...");

  // copy project files
  copyFile(
    getTemplateDir(`frontend/html-css-javascript/index.html`),
    destinationPath,
  );

  // success message
  spinner.succeed(
    `Frontend - HTML, CSS, and JavaScript project created successfully! : ${destinationPath}`,
  );
}
