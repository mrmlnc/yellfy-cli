const assert = require('assert');
const exec = require('child_process').exec;

it('Help', (done) => {
  exec('node cli.js -h', (err, stdout) => {
    if (err) {
      assert.fail(err);
    }
    assert.equal(/yellfy \[<options>\]/.test(stdout), true);
    done();
  });
});

it('Destination path is not an empty directory', (done) => {
  exec('node cli.js', (err, stdout, stderr) => {
    if (err) {
      assert.fail(err);
    }
    assert.equal(/Destination path is not an empty/.test(stderr), true);
    done();
  });
});

it('Yellfy with options', (done) => {
  exec('node cli.js --dir=tmp/default --tag=1.0.0-a', (err, stdout) => {
    if (err) {
      assert.fail(err);
    }
    assert.equal(/1.0.0-a/.test(stdout), true);
    done();
  });
});
