var test = require('ava');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

test('Destination path is not an empty directory', function(t) {
  exec('node cli.js', function(err, stdout, stderr) {
    if (err) {
      t.fail(err);
    } else {
      t.is(stderr, '>> Destination path is not an empty directory\n');
      t.end();
    }
  });
});

test('Yellfy initialization()', function(t) {
  rimraf('tmp', function(err) {
    if (err) {
      t.fail(err);
    }

    exec('node cli.js --dir=tmp --tag=1.0.0-a', function(err, stdout) {
      if (err) {
        t.fail(err);
      } else {
        t.is(stdout.indexOf('1.0.0-a') > 0, true);
        t.end();
      }
    });
  });
});
