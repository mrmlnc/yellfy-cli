#!/usr/bin/env node

'use strict';

// Node.js libs
const path = require('path');
// Common libs
const chalk = require('chalk');
const meow = require('meow');
// Local libs
const git = require('./lib/git');
const utils = require('./lib/utils');
// Common vars
const cwd = process.cwd();

// If the user wants to see a help screen
const cli = meow({
  description: `Hello, i'm ${chalk.yellow('Yellfy') }!`,
  help: `
  Usage:
    $ yellfy [<options>]

  Options:
    -h, --help, help  Show help
    --dir             The deployment instance Yellfy in the specified directory
    --tag             Install the specified version
    -i, --install     Start the installation dependencies after you deploy an instance Yellfy

  Examples:
    $ yellfy --dir=tmp/yellfy
    $ yellfy --tag=1.0.0-a
`
}, {
  alias: {
    h: 'help',
    i: 'install'
  }
});

// Welcome display
utils.log.yellfy(`Hello, i'm ${chalk.yellow('Yellfy') }!`);

// Clone repo
const targetDir = (cli.flags.dir) ? path.join(cwd, cli.flags.dir) : cwd;
git.repoClone('https://github.com/mrmlnc/yellfy', targetDir)
  .then(() => {
    // If used a specified directory
    if (targetDir !== cwd) {
      process.chdir(targetDir);
    }

    utils.log.success(`Repository cloned into ${chalk.cyan(targetDir)}`);
    return git.repoCheckout(cli.flags.tag);
  })
  .then((tag) => {
    utils.log.success(`The repository switched to the tag ${chalk.blue(tag)}`);
    return (cli.flags.install) ? utils.installDeps() : 'Setting Yellfy completed!';
  })
  .then((info) => {
    utils.log.success(info);
  })
  .catch((err) => {
    if (err.code === 128) {
      utils.log.err('Destination path is not an empty directory');
      return;
    }

    throw err;
  });
