var assert = require('assert');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

it('Help', function(done) {
  exec('node cli.js help', function(err, stdout) {
    if (err) {
      assert.fail(err);
    }
    assert.equal(/yellfy \[<options>\]/.test(stdout), true);
    done();
  });
});

it('Destination path is not an empty directory', function(done) {
  exec('node cli.js', function(err, stdout, stderr) {
    if (err) {
      assert.fail(err);
    }
    assert.equal(stderr, '>> Destination path is not an empty directory\n');
    done();
  });
});

it('Yellfy with options', function(done) {
  rimraf.sync('tmp');
  exec('node cli.js --dir=tmp --tag=1.0.0-a', function(err, stdout) {
    if (err) {
      assert.fail(err);
    }
    assert.equal(stdout.indexOf('1.0.0-a') > 0, true);
    done();
  });
});
