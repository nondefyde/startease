import {
  copyFile,
  getTemplateDir,
  updateFileContent,
  writeToFile,
} from "../../utils/file-manager.js";
import shell from "shelljs";
import { DJANGO_MANAGER } from "../../../templates/backend/django/base/manage.js";
import { DJANGO_WSGI } from "../../../templates/backend/django/base/wsgi.js";
import { DJANGO_ASGI } from "../../../templates/backend/django/base/asgi.js";
import { DJANGO_SETTINGS } from "../../../templates/backend/django/base/settings.js";
import { DJANGO_ENV_VARIABLES } from "../../../templates/backend/django/base/env.js";
import {
  DJANGO_POSTGRES_SETUP,
  DJANGO_SQLITE_SETUP,
} from "../../../templates/backend/django/base/database.js";

export async function createDjangoProject({
  projectName,
  destinationPath,
  database,
  spinner,
}) {
  // django does not support some file namings so the name has to be parsed into a valid python identifier.
  projectName = projectName.replaceAll(/[-. ]/g, "");

  // copy django template to directory

  copyFile(getTemplateDir("backend/django/django-temp"), destinationPath);

  // rename project name in final source

  shell.mv(
    `${destinationPath}/django_boilerplate`,
    `${destinationPath}/${projectName}`,
  );

  writeToFile(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES);

  writeToFile(`${destinationPath}/manage.py`, DJANGO_MANAGER);

  writeToFile(`${destinationPath}/${projectName}/settings.py`, DJANGO_SETTINGS);

  writeToFile(`${destinationPath}/${projectName}/wsgi.py`, DJANGO_WSGI);

  writeToFile(`${destinationPath}/${projectName}/asgi.py`, DJANGO_ASGI);

  if (database && database !== "sqlite3") {
    switch (database) {
      case "postgresql":
        updateFileContent(
          `${destinationPath}/${projectName}/settings.py`,
          DJANGO_SETTINGS,
          {
            projectName,
            DATABASE_IMPORT: "import dj_database_url",
            DATABASE_SETUP: DJANGO_POSTGRES_SETUP,
          },
        );

        updateFileContent(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES, {
          SECRET_KEY: crypto.randomUUID().split("-").join(""),
          DATABASE_ENV:
            "DATABASE_URL=postgres://username:password@localhost:5432",
        });
        break;
    }
  } else {
    updateFileContent(
      `${destinationPath}/${projectName}/settings.py`,
      DJANGO_SETTINGS,
      {
        projectName,
        DATABASE_IMPORT: "",
        DATABASE_SETUP: DJANGO_SQLITE_SETUP,
      },
    );

    updateFileContent(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES, {
      SECRET_KEY: crypto.randomUUID().split("-").join(""),
      DATABASE_ENV: "",
    });
  }

  // add updates to django starter files

  updateFileContent(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES, {
    SECRET_KEY: crypto.randomUUID().split("-").join(""),
  });

  updateFileContent(`${destinationPath}/manage.py`, DJANGO_MANAGER, {
    projectName,
  });

  updateFileContent(`${destinationPath}/${projectName}/wsgi.py`, DJANGO_WSGI, {
    projectName,
  });

  updateFileContent(`${destinationPath}/${projectName}/asgi.py`, DJANGO_ASGI, {
    projectName,
  });

  if (shell.which("git")) {
    // initialize git for the final source

    spinner.succeed();
    spinner.start("Initializing git ...");

    shell.cd(`${destinationPath}`);
    shell.exec(`git init`);
    shell.exec(`git add .`);
    shell.exec(`git commit -m "Initial commit"`);
    shell.cd("-");
  }
}
