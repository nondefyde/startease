import { createReactJavascriptProject } from "./createReactJavascript.js";
import { createReactTypescriptProject } from "./createReactTypescript.js";

export function createReactProject({ language, destinationPath, spinner }) {
  spinner.start("Creating ReactJS project ...");

  switch (language) {
    case "javascript":
      return createReactJavascriptProject({
        destinationPath,
        spinner,
        language,
      });
    case "typescript":
      return createReactTypescriptProject({
        destinationPath,
        spinner,
        language,
      });
    default:
      console.log("Invalid language");
      break;
  }
}
