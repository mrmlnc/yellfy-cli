#!/usr/bin/env node
var path = require('path');
var chalk = require('chalk');
var exec = require('child_process').exec;
var args = require('minimist')(process.argv);
var cwd = process.cwd();
var targetDir = (args.dir) ? path.join(cwd, args.dir) : cwd;

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
    console.log(chalk.cyan('>> ') + 'Start install dependencies...');
    exec('npm i', function(err) {
      if (err) {
        reject(err);
      }

      resolve('All dependencies are installed. Setting Yellfy completed!');
    });
  });
};

console.log(chalk.yellow('>> ') + 'Hello, i\'m ' + chalk.yellow('Yellfy'));
repoClone('https://github.com/mrmlnc/yellfy', targetDir)
  .then(function(info) {
    if (targetDir !== cwd) {
      process.chdir(targetDir);
    }

    output.success(info);
    return repoCheckout();
  })
  .then(function(tag) {
    output.success('To repository settled the ' + chalk.blue(tag) + ' tag');
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
