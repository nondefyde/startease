/**
 * This file contains shared constants and functions for react , nextjs , vuejs , html , css , javascript , angular , svelte , and solidjs projects.
 */
export const GIT_IGNORE_CONTENT_1 = `
node_modules/
.DS_Store
dist
dist-ssr
.next
*.local

/cypress/videos/
/cypress/screenshots/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment config
.env  
.env.development.local
.env.test.local
.env.production.local
.env.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

`;

/**
 * This file contains shared constants and functions for expressjs , nestjs , django  projects.
 */
export const GIT_IGNORE_CONTENT_2 = `
# Dependency directories
node_modules/
.venv/
__pycache__/
db.sqlite3
.DS_Store

# Build and distribution directories
dist/
build/
*.egg-info/
*.pyc
*.pyo
*.pyd

# Environment config
.env  
.env.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# Editor directories and files
.vscode/
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# IDEs and editors
/.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# Python
*.py[cod]
__pycache__/
*.so
.Python
pip-log.txt
pip-delete-this-directory.txt

# Django
*.sqlite3
*.log
media/
staticfiles/
static/
local_settings.py
.env
`;
