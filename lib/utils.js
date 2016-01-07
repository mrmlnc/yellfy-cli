'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const exec = require('child_process').exec;
const Promise = require('promise');

module.exports.log = {
  yellfy: (msg) => console.log(chalk.yellow('>> ') + msg),
  err: (msg) => console.error(chalk.red('>> ') + msg),
  success: (msg) => console.log(chalk.green('>> ') + msg)
};

/**
 * Test whether or not the given path exists by checking with the file system
 *
 * @param {String} filepath
 */
const existsStat = (filepath) => {
  try {
    return fs.statSync(filepath);
  } catch (err) {
    return false;
  }
};

module.exports.existsStat = existsStat;

/**
 * Creating dirs
 *
 * @param {String} dir
 */
const mkdirs = (dir) => {
  if (existsStat(dir) && existsStat(dir).isDirectory()) {
    return;
  }
  const i = dir.lastIndexOf(path.sep);

  mkdirs(dir.substring(0, i));
  fs.mkdirSync(dir);
};

module.exports.mkdirs = mkdirs;

/**
 * Install dependencies
 */
module.exports.installDeps = () =>
  new Promise((resolve, reject) => {
    console.log(`${chalk.cyan('>> ')} Installing dependencies...`);
    exec('npm i', (err) => {
      if (err) {
        reject(err);
      }

      resolve('All dependencies are installed. Setting Yellfy completed!');
    });
  });
