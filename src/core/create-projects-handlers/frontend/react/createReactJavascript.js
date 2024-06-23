import { copyFile, getTemplateDir } from "../../../utils/file-manager.js";

export async function createReactJavascriptProject({
  destinationPath,
  spinner,
  language,
}) {
  console.log("check 1");
  // copy project files
  copyFile(
    getTemplateDir(`frontend/reactjs/react-javascript-temp`),
    destinationPath,
  );

  console.log("check 2");

  // success message
  spinner.succeed(
    `Frontend - ReactJS project with ${
      language.charAt(0).toUpperCase() + language.slice(1)
    } created successfully! : ${destinationPath}`,
  );

  console.log("check 3");
}
