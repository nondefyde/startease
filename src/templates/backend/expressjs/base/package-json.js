export const ExpressJsPackageJsonTemplate = {
  name: "startease-expressjs-project",
  version: "1.0.0",
  description: "Expressjs project generated using startease CLI tool",
  type: "module",
  scripts: {
    dev: "node --watch src/server.js",
    start: "node src/server.js",
    "format:check": "prettier --check .",
    "format:fix": "prettier --write .",
    lint: "eslint .",
    "lint:fix": "eslint --fix .",
  },
  author: "",
  license: "ISC",
  dependencies: {
    "connect-timeout": "^1.9.0",
    cors: "^2.8.5",
    dotenv: "^16.3.1",
    express: "^4.18.2",
    helmet: "^7.0.0",
    morgan: "^1.10.0",
    winston: "^3.10.0",
    compression: "^1.7.4",
  },
  devDependencies: {
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    prettier: "^3.1.1",
  },
};
