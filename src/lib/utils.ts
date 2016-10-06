'use strict';

import * as chalk from 'chalk';

export const log = {
  yellfy: (msg) => console.log(chalk.yellow('>> ') + msg),
  err: (msg) => console.error(chalk.red('>> ') + msg),
  ok: (msg) => console.log(chalk.green('>> ') + msg)
};
