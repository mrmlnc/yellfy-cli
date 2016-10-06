'use strict';

import * as path from 'path';
import * as fs from 'fs';

import * as mkdir from 'mkdirp';

export function pathExists(filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filepath, (err) => {
      resolve(!err);
    });
  });
}

export function removeFile(filepath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.unlink(filepath, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

export function readFile(filepath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

export function writeFile(filepath: string, data: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    mkdir(dir, (mkdirError) => {
      if (mkdirError) {
        reject(mkdirError);
      }

      fs.writeFile(filepath, data, (writeError) => {
        if (writeError) {
          reject(writeError);
        }

        resolve();
      });
    });
  });
}
