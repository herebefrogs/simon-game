require.config({
  paths: {
    app: '../../scripts'
  }
});

require(['simon'], function() {
  mocha.run();
});

