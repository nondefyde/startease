import { copyFile, getTemplateDir } from "../../../utils/file-manager.js";

export async function createReactJavascriptProject({
  destinationPath,
  spinner,
  language,
}) {
  // copy project files
  copyFile(
    getTemplateDir(`frontend/reactjs/react-javascript-temp`),
    destinationPath,
  );

  // success message
  spinner.succeed(
    `Frontend - ReactJS project with ${
      language.charAt(0).toUpperCase() + language.slice(1)
    } created successfully! : ${destinationPath}`,
  );
}
