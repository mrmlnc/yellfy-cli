#!/usr/bin/env node

'use strict';

// Node.js libs
const path = require('path');
const fs = require('fs-extra');
// Common libs
const chalk = require('chalk');
const meow = require('meow');
const readPkgUp = require('read-pkg-up');
const status = require('elegant-status');
// Local libs
const files = require('./lib/files');
const git = require('./lib/git');
const utils = require('./lib/utils');
// Common vars
const cwd = process.cwd();
const pkg = readPkgUp.sync().pkg;
// Indicators
let statusDone = status('Cloning the repository...');

// If the user wants to see a help screen
const cli = meow({
  description: `Hello, i'm ${chalk.yellow('Yellfy')}!`,
  help: `
  ${chalk.yellow('Usage:')}
    $ yellfy [<options>]

  ${chalk.yellow('Options:')}
    -h, --help, help     Show help
    --dir                The deployment instance Yellfy in the specified directory
    --tag                Install the specified version
    -i, --install        Start the installation dependencies after you deploy an instance Yellfy
    --page               Creating a page (templates + styles)
    --comp, --component  Creating a component (template + styles)
    -r                   Overwrite the page or component

  ${chalk.yellow('Examples:')}
    $ yellfy --dir=tmp/yellfy
    $ yellfy --tag=1.0.0-a
    $ yellfy --page=features
`
}, {
  alias: {
    h: 'help',
    i: 'install',
    comp: 'component'
  }
});

// Welcome display
utils.log.yellfy(`Hello, i'm ${chalk.yellow('Yellfy')}!\n`);

// Creating pages and components
if (cli.flags.page || cli.flags.comp) {
  if (pkg === undefined || pkg.name !== 'yellfy') {
    utils.log.err('Yellfy instance is not found in this directory');
    process.exit(0);
  }

  // Page
  if (cli.flags.page) {
    const name = cli.flags.page;
    const pagePath = path.join('app/templates', `${name}.html`);
    if (!utils.existsSync(pagePath) || cli.flags.r) {
      files.createPage(name);
      utils.log.ok(`The page "${name}" was created!`);
    } else {
      utils.log.err(`A page with this name ("${name}") already exists. Use "-r" to overwrite it.`);
    }
  }

  // Component
  if (cli.flags.comp) {
    const name = cli.flags.comp;
    const compPath = path.join('app/templates/components', `_${name}.html`);
    if (!utils.existsSync(compPath) || cli.flags.r) {
      files.createComponent(cli.flags.comp);
      utils.log.ok(`The component "${name}" was created!`);
    } else {
      utils.log.err(`A component with this name ("${name}") already exists. Use "-r" to overwrite it.`);
    }
  }

  process.exit(0);
}

// Clone repo
const targetDir = (cli.flags.dir) ? path.join(cwd, cli.flags.dir) : cwd;
git.repoClone('https://github.com/mrmlnc/yellfy', targetDir)
  .then(() => {
    if (targetDir !== cwd) {
      process.chdir(targetDir);
    }

    statusDone(true);
    statusDone = status('Switching version...');
    return git.repoCheckout(cli.flags.tag);
  })
  .then((tag) => {
    statusDone(true);
    if (cli.flags.i) {
      statusDone = status('Installing dependencies...');
      return utils.installDeps();
    }

    statusDone = status('Remove git...');
    fs.removeSync('.git');
    statusDone(true);
    utils.log.ok(`The repository switched to the tag ${chalk.blue(tag)}.`);
    utils.log.ok(`Setting ${chalk.yellow('Yellfy')} completed!`);
  })
  .then(() => {
    if (cli.flags.i) {
      statusDone(true);
      utils.log.ok(`Setting ${chalk.yellow('Yellfy')} completed!`);
    }
  })
  .catch((err) => {
    statusDone(false);
    if (err.code === 128) {
      utils.log.err('Destination path is not an empty directory');
      return;
    }

    console.log(err);
  });
