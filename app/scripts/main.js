require.config({
  paths: {
    jquery: '../components/jquery/jquery'
  }
});

require(['Simon'], function (Simon) {
  'use strict';

  var simon = new Simon($('body'));
});
