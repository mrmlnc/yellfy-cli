#!/usr/bin/env node
'use strict';
var path = require('path');
var chalk = require('chalk');
var exec = require('child_process').exec;
var args = require('minimist')(process.argv.slice(2));
var cwd = process.cwd();
var targetDir = (args.dir) ? path.join(cwd, args.dir) : cwd;

console.log(chalk.yellow('>> ') + 'Hello, i\'m ' + chalk.yellow('Yellfy') + '!');
if (args.h || args.help || args._[0] === 'help') {
  console.log(
    chalk.yellow('   Usage:\n'),
    '    $ yellfy [<options>]\n\n',
    chalk.yellow('  Options:\n'),
    '    -h, --help, help    Show help\n',
    '    --dir               The deployment instance Yellfy in the specified directory\n',
    '    --tag               Install the specified version\n',
    '    -i, --install       Start the installation dependencies after you deploy an instance Yellfy.\n\n',
    chalk.yellow('  Examples:\n'),
    '    $ yellfy --dir=tmp/yellfy\n',
    '    $ yellfy --tag=1.0.0-a\n',
    '    $ yellfy -i'
  );
  process.exit();
}

var output = {
  err: function(message) {
    console.error(chalk.red('>> ') + message);
  },
  success: function(message) {
    console.log(chalk.green('>> ') + message);
  }
};

var repoClone = function(gitUrl, targetDir) {
  return new Promise(function(resolve, reject) {
    exec('git clone ' + gitUrl + ' ' + targetDir, function(err) {
      if (err) {
        reject(err);
      }

      resolve('Repository cloned into ' + chalk.cyan(targetDir));
    });
  });
};

var repoCheckout = function() {
  return new Promise(function(resolve, reject) {
    exec('git tag -l', function(err, stdout) {
      if (err) {
        reject(err);
      }

      var tag = args.tag;
      if (!args.tag) {
        var tags = stdout.toString().split('\n').filter(function(tag) {
          return /^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(tag);
        });
        tag = tags[tags.length - 1];
      }

      exec('git checkout ' + tag, function(err) {
        if (err) {
          reject(err);
        }

        resolve(tag);
      });
    });
  });
};

var installDeps = function() {
  return new Promise(function(resolve, reject) {
    console.log(chalk.cyan('>> ') + 'Installing dependencies...');
    exec('npm i', function(err) {
      if (err) {
        reject(err);
      }

      resolve('All dependencies are installed. Setting Yellfy completed!');
    });
  });
};

repoClone('https://github.com/mrmlnc/yellfy', targetDir)
  .then(function(info) {
    if (targetDir !== cwd) {
      process.chdir(targetDir);
    }

    output.success(info);
    return repoCheckout();
  })
  .then(function(tag) {
    output.success('The repository switched to the tag ' + chalk.blue(tag));
    return (args.i || args.install) ? installDeps() : 'Setting Yellfy completed!';
  })
  .then(function(info) {
    output.success(info);
  })
  .catch(function(err) {
    if (err.code === 128) {
      output.err('Destination path is not an empty directory');
    } else {
      throw err;
    }
  });
