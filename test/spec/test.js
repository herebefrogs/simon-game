require.config({
  paths: {
    app: '../../scripts',
    jquery: '../../components/jquery/jquery'
  }
});

require(['simon'], function() {
  mocha.run();
});

