const path = require('path');
const fs = require('fs-extra');

/**
 * Replacement tags in templates on the value
 *
 * @param {String} data
 * @param {String} name
 */
const replaceTag = (data, name) => data.replace(/\$Y{name}/g, name);

/**
 * Reading files
 *
 * @param {Array} paths
 */
const readRef = (paths) =>
  paths.map((filepath) => {
    filepath = path.join(__dirname, filepath);
    return fs.readFileSync(filepath, 'utf-8');
  });

/**
 * Writing files
 *
 * @param {Array} paths
 * @param {Array} refs
 * @param {String} name
 */
const writeFiles = (paths, refs, name) =>
  paths.forEach((filepath, index) => {
    fs.outputFileSync(filepath, replaceTag(refs[index], name));
  });

/**
 * Creating new page (templates + styles)
 *
 * @param {String} name
 */
module.exports.createPage = (name) => {
  const refs = readRef([
    '../templates/page.html',
    '../templates/page-main.html',
    '../templates/page.less'
  ]);

  writeFiles([
    path.join('app/templates', `${name}.html`),
    path.join('app/templates/pages', name, '_main.html'),
    path.join('app/styles/less/pages', `_${name}.less`)
  ], refs, name);
};

/**
 * Creating new component (template + styles)
 *
 * @param {String} name
 */
module.exports.createComponent = (name) => {
  const refs = readRef([
    '../templates/component.html',
    '../templates/component.less'
  ]);

  writeFiles([
    path.join('app/templates/components', `_${name}.html`),
    path.join('app/styles/less/components', `_${name}.less`)
  ], refs, name);
};
