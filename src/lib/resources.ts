'use strict';

import * as fs from 'fs';
import * as cp from 'child_process';

import * as chalk from 'chalk';

const got = require('got');
const ora = require('ora');
const tempfile = require('tempfile');
const decompress = require('decompress');

import * as io from './io';
import { IOptions } from '../cli';

export async function createPage(options: IOptions): Promise<any> {
  let spinner = ora({ color: 'yellow' }).start();

  const html = options.pkg.yellfy.html;
  const css = options.pkg.yellfy.css;

  try {
    const exists = await io.pathExists(`app/templtes/${options.flags.page}.${html}`);
    if (exists && !options.flags.rewrite) {
      throw `A page with this name '${chalk.bold(options.flags.page)}' already exists. Use '-r' to overwrite it.`;
    }

    spinner.text = ' Read project templates.';
    const templates = {
      index: await io.readFile(`${options.pkg.yellfy.path}/page.index.${html}.tpl`),
      markup: await io.readFile(`${options.pkg.yellfy.path}/page.markup.${html}.tpl`),
      styles: await io.readFile(`${options.pkg.yellfy.path}/page.styles.${css}.tpl`)
    };
    spinner.succeed();

    templates.index = templates.index.replace(/\${slug}/g, options.flags.page);
    templates.markup = templates.markup.replace(/\${slug}/g, options.flags.page);
    templates.styles = templates.styles.replace(/\${slug}/g, options.flags.page);

    spinner.start();
    spinner.text = ` Creating page with name ${chalk.bold(options.flags.page)}`;
    await io.writeFile(`app/templates/${options.flags.page}.${html}`, templates.index);
    await io.writeFile(`app/templates/pages/${options.flags.page}/_main.${html}`, templates.markup);
    await io.writeFile(`app/styles/${css}/pages/_${options.flags.page}.${css}`, templates.styles);
    spinner.succeed();
  } catch (err) {
    spinner.text = ' ' + err.toString();
    spinner.fail();
    process.exit(0);
  }
}

export async function createComponent(options: IOptions): Promise<any> {
  let spinner = ora({ color: 'yellow' }).start();

  const html = options.pkg.yellfy.html;
  const css = options.pkg.yellfy.css;

  try {
    const exists = await io.pathExists(`app/templates/components/_${options.flags.component}.${html}`);
    if (exists && !options.flags.rewrite) {
      throw `A component with this name '${chalk.bold(options.flags.component)}' already exists. Use '-r' to overwrite it.`;
    }

    spinner.text = ' Read project templates.';
    const templates = {
      markup: await io.readFile(`${options.pkg.yellfy.path}/component.markup.${html}.tpl`),
      styles: await io.readFile(`${options.pkg.yellfy.path}/component.styles.${css}.tpl`)
    };
    spinner.succeed();

    templates.markup = templates.markup.replace(/\${slug}/g, options.flags.component);
    templates.styles = templates.styles.replace(/\${slug}/g, options.flags.component);

    spinner.start();
    spinner.text = ` Creating component with name ${chalk.bold(options.flags.component)}`;
    await io.writeFile(`app/templates/components/_${options.flags.component}.${html}`, templates.markup);
    await io.writeFile(`app/styles/${css}/components/_${options.flags.component}.${css}`, templates.styles);
    spinner.succeed();
  } catch (err) {
    spinner.text = ' ' + err.toString();
    spinner.fail();
    process.exit(0);
  }
}

export async function createInstance(options: IOptions): Promise<any> {
  let spinner = ora({ color: 'yellow' }).start();

  let latestRelease = null;
  let tmpFile = null;
  try {
    spinner.text = ' Check target directory.';
    const dirStatus = await checkDirectory(options.flags.dir || '.');
    if (!dirStatus) {
      throw 'Target directory is not empty.';
    }
    spinner.succeed();

    // Get info about latest release
    spinner.text = ' Check the version of the release.';
    latestRelease = await getLatestRelease(options.flags.tag);
    spinner.succeed();

    // Download latest release
    spinner.start();
    spinner.text = ' Downloading archive release.';
    tmpFile = await downloadLatestRelease(latestRelease.zip);
    spinner.succeed();

    // Decompress release archive
    spinner.start();
    spinner.text = ' Decompressing archive release.';
    await decompressRelease(tmpFile, spinner, options);
    spinner.succeed();

    // Remove temp file
    spinner.start();
    spinner.text = ' Removing the temporary archive.';
    await io.removeFile(tmpFile);
    spinner.succeed();

    if (options.flags.install) {
      spinner.start();
      spinner.text = ' Installing dependencies.';
      await installDependencies();
      spinner.succeed();
    }
  } catch (err) {
    spinner.text = ' ' + err.toString();
    await io.removeFile(tmpFile);
    spinner.fail();
    process.exit(0);
  }
}

function checkDirectory(filepath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(filepath, (err, files) => {
      if (err) {
        return resolve(true);
      }

      files = files.filter((file) => ['.git'].indexOf(file) === -1);

      resolve(files.length === 0);
    });
  });
}

function getLatestRelease(tag: string): Promise<any> {
  let url = 'https://api.github.com/repos/mrmlnc/yellfy/releases/latest';
  if (tag) {
    url = `https://api.github.com/repos/mrmlnc/yellfy/releases/tags/${tag}`;
  }

  return got(url, { json: true }).then((res) => ({
    tag: res.body.tag_name,
    draft: res.body.draft,
    zip: res.body.zipball_url
  }));
}

function downloadLatestRelease(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const tmp = tempfile('.zip');

    got.stream(url).pipe(fs.createWriteStream(tmp))
      .on('error', (err) => reject(err))
      .on('finish', () => resolve(tmp));
  });
}

function decompressRelease(filepath: string, spinner: any, options: IOptions): Promise<any> {
  return decompress(filepath, options.flags.dir || '.', { strip: 1 });
}

function installDependencies(): Promise<any> {
  return new Promise((resolve, reject) => {
    cp.exec('npm i', (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}
