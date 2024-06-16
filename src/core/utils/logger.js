import chalk from 'chalk';

export class Logger {
  log(message) {
    console.log(chalk.green(message));
  }

  warn(message) {
    console.log(chalk.yellow(message));
  }

  error(message) {
    console.log(chalk.red(message));
  }
}

