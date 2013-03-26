require.config({
  paths: {
    jquery: '../components/jquery/jquery'
  }
});

require(['Simon'], function (Simon) {
  'use strict';

  var game = new Simon();

  game.newTurn();
});
