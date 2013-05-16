require.config({
  paths: {
    app: '../scripts',
    lib: '../lib',
    jquery: '../lib/jquery/jquery'
  }
});

require(['simon'], function() {
  mocha.run();
});

