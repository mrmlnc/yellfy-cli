#!/usr/bin/env node

'use strict';

import * as chalk from 'chalk';
import * as meow from 'meow';

const readPkgUp = require('read-pkg-up');

import { log } from './lib/utils';
import * as resources from './lib/resources';

export interface IOptions {
  flags: {
    help?: boolean;
    dir?: string;
    tag?: string;
    install?: boolean;
    page?: string;
    component?: string;
    rewrite?: boolean;
  };
  pkg: {
    yellfy: {
      path: string;
      html: string;
      css: string;
    }
  };
}

const meowText = {
  description: `Hello, i'm ${chalk.yellow('Yellfy')} CLI!`,
  help: `
  ${chalk.yellow('Usage:')}
    $ ${chalk.bold('yellfy')} [<options>]

  ${chalk.yellow('Options:')}
    ${chalk.bold('-h, --help')}       Show help
    ${chalk.bold('-d, --dir')}        The deployment instance Yellfy in the specified directory
    ${chalk.bold('-t, --tag')}        Install the specified version
    ${chalk.bold('-i, --install')}    Start the installation dependencies after you deploy an instance Yellfy
    ${chalk.bold('-p, --page')}       Creating a page (templates + styles)
    ${chalk.bold('-с, --component')}  Creating a component (template + styles)
    ${chalk.bold('-r, --rewrite')}    Overwrite the page or component

  ${chalk.yellow('Examples:')}
    $ yellfy --dir=tmp/yellfy
    $ yellfy --tag=2.0.0
    $ yellfy --page=features
    $ yellfy --component=adsense
  `
};

const meowOptions = <any>{
  alias: {
    h: 'help',
    d: 'dir',
    t: 'tag',
    i: 'install',
    p: 'page',
    c: 'component',
    r: 'rewrite'
  }
};

// Create CLI interface
const cli = <IOptions>meow(meowText, meowOptions);

// Welcome display
log.yellfy(`Hello, i'm ${chalk.yellow('Yellfy')} CLI!\n`);

// Creating pages or components
async function start() {
  if (cli.flags.page || cli.flags.component) {
    const { pkg } = await readPkgUp() || { pkg: null };

    cli.pkg = pkg;

    // We only work with Yellfy 2.0.0
    if (!pkg || pkg.name !== 'yellfy' || pkg.version[0] !== '2') {
      log.err('Yellfy instance is not found in this directory.');
      process.exit(0);
    }

    // Creating page
    if (cli.flags.page) {
      await resources.createPage(cli);
    }

    // Creating component
    if (cli.flags.component) {
      await resources.createComponent(cli);
    }

    process.exit(0);
  }

  // Create a new instance of Yellfy
  await resources.createInstance(cli);
}

// Run CLI
start();
