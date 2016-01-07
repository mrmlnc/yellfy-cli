'use strict';

const chalk = require('chalk');
const exec = require('child_process').exec;
const Promise = require('promise');

/**
 * Cloning repository
 *
 * @param {String} gitUrl
 * @param {String} targetDir
 */
module.exports.repoClone = (gitUrl, targetDir) =>
  new Promise((resolve, reject) => {
    exec('git clone ' + gitUrl + ' ' + targetDir, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });

/**
 * Navigate to the checkout in cloned repository
 *
 * @param {String} tag
 */
module.exports.repoCheckout = (tag) =>
  new Promise((resolve, reject) => {
    exec('git tag -l', (err, stdout) => {
      if (err) {
        reject(err);
      }

      if (!tag) {
        const tags = stdout.toString().split('\n').filter((tagName) => {
          return /^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(tagName);
        });
        tag = tags.slice(-1)[0];
      }

      exec('git checkout ' + tag, (err) => {
        if (err) {
          reject(err);
        }

        resolve(tag);
      });
    });
  });
