require.config({
  paths: {
    app: '../../scripts',
    lib: '../lib'
  }
});

require(['simon'], function() {
  mocha.run();
});

