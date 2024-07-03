import { createVueJavascriptProject } from "./createVueJavascript.js";
import { createVueTypescriptProject } from "./createVueTypescript.js";

export function createVueProject({ language, destinationPath, spinner }) {
  spinner.start("Creating VueJS project ...");

  switch (language) {
    case "javascript":
      return createVueJavascriptProject({
        destinationPath,
        spinner,
        language,
      });
    case "typescript":
      return createVueTypescriptProject({
        destinationPath,
        spinner,
        language,
      });
    default:
      console.log("Invalid language");
      break;
  }
}
