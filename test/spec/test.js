require.config({
  paths: {
    app: '../../scripts',
    lib: '../lib',
    jquery: '../../components/jquery/jquery'
  }
});

require(['simon'], function() {
  mocha.run();
});

