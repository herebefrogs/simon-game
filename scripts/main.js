require.config({
  paths: {
    jquery: '../lib/jquery/jquery'
  }
});

require(['Simon'], function (Simon) {
  'use strict';

  var game = new Simon($('body'));

  game.newGame();
});
