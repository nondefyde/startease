export const ExpressJsPackageJsonTemplate = {
  name: 'project-starter-template',
  version: '1.0.0',
  description: '',
  main: 'index.js',
  type: 'module',
  scripts: {
    dev: 'node --watch src/server.js'
  },
  author: '',
  license: 'ISC',
  dependencies: {
    'connect-timeout': '^1.9.0',
    cors: '^2.8.5',
    dotenv: '^16.3.1',
    express: '^4.18.2',
    helmet: '^7.0.0',
    morgan: '^1.10.0',
    winston: '^3.10.0'
  }
};
