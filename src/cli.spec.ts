'use strict';

import * as assert from 'assert';

const execa = require('execa');

describe('Yellfy CLI', () => {

  it('Should show help', () => {
    return execa('./out/cli.js', ['-h']).then((result) => {
      assert.ok(/yellfy \[<options>\]/.test(result.stdout));
    });
  });

  it('Should create a new Yellfy instance', () => {
    return execa('./out/cli.js', ['-d', '.tmp']).then((result) => {
      assert.ok(result.stdout);
    });
  });

});
