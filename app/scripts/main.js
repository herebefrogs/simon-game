require.config({
  paths: {
    jquery: '../components/jquery/jquery'
  }
});

require(['jquery'], function ($) {
  'use strict';
  console.log('Running jQuery %s', $().jquery);
});
