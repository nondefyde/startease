export const PROJECT_CONSTANTS = {
  frameworks: {
    expressjs: "expressjs",
    nestjs: "nestjs",
    django: "django",
    reactjs: "reactjs",
    vuejs: "vuejs",
    "html-x-css-x-javascript": "html-x-css-x-javascript",
  },
  databases: {
    mongodb: "mongodb",
    postgresql: "postgresql",
    mysql: "mysql",
    sqlite: "sqlite",
  },
  orms: {
    mongoose: "mongoose",
    typeorm: "typeorm",
  },
  templates: {
    frontend: {},
    backend: {
      "express-ts": {
        0: {
          matches: ["expressjs", "typescript", "mongoose"],
          dir: "backend/express-ts/v0",
        },
      },
    },
  },
};
