var assert = require('assert');
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
    assert.equal(/\>\> Destination path is not/.test(stderr), true);
    done();
  });
});

it('Yellfy with options', function(done) {
  exec('node cli.js --dir=tmp/default --tag=1.0.0-a', function(err, stdout) {
    if (err) {
      assert.fail(err);
    }
    assert.equal(/1.0.0-a/.test(stdout), true);
    done();
  });
});
