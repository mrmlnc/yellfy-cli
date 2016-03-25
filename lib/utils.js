'use strict';

const fs = require('fs');
const chalk = require('chalk');
const exec = require('child_process').exec;
const Promise = require('promise');
const execP = Promise.denodeify(exec);

module.exports.log = {
  yellfy: (msg) => console.log(chalk.yellow('>> ') + msg),
  err: (msg) => console.error(chalk.red('>> ') + msg),
  ok: (msg) => console.log(chalk.green('>> ') + msg)
};

/**
 * Test whether or not the given path exists by checking with the file system
 *
 * @param {String} filepath
 */
module.exports.existsSync = (filepath) => {
  try {
    return Boolean(fs.statSync(filepath));
  } catch (err) {
    return false;
  }
};

/**
 * Install dependencies
 */
module.exports.installDeps = () => execP('npm i');

/**
 * Get extension and directory name
 */
module.exports.getExtAndDir = (ext) => {
  let extension = 'less';
  let directory = 'less';

  if (ext.sass || ext.scss) {
    extension = 'scss';
    directory = 'scss';
  }

  if (ext.stylus || ext.styl) {
    extension = 'styl';
    directory = 'stylus';
  }

  return {
    ext: extension,
    dir: directory
  };
};
