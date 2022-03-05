const chalk = require("chalk");

class Logger {
  get now() {
    return Intl.DateTimeFormat("zh-TW", {
      minute: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      month: "2-digit",
      year: "numeric",
      second: "2-digit",
    }).format(Date.now());
  }

  /**
   * @param {string} type
   * @param {string} error
   */
  error(type, error) {
    const err = error instanceof Error ? error.message : error;
    return console.error(`${chalk.green("[MR.SHARK]:")}${chalk.red("[ERROR]")}${err}`);
  }

  /**
   * @param {string} type
   * @param {string} warning
   */
  warn(type, warning) {
    return console.warn(`${chalk.green("[MR.SHARK]:")}${chalk.yellow("[WARNING]")}${warning}`);
  }

  /**
   * @param {string} type
   * @param {string} content
   */
  info(type, content) {
    return console.log(`${chalk.green("[MR.SHARK]:")}${chalk.blueBright("[INFO]")}${content}`);
  }

  /**
   * @param {string} type
   * @param {string} text
   */
  debug(type, text) {
    return console.log(`${chalk.green("[MR.SHARK]:")}${chalk.magenta("[DEBUG]")}${text}`);
  }
}

module.exports = new Logger();
