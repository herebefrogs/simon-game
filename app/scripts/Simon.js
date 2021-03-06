define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.page = page;
    this.tiles = page.find('.tile');

    var _ref = this;
    page.find('.restart').on('click', function() {
      _gaq.push([ '_trackPageview', '/simon-game/restart' ]);

      _ref.newGame();
    });
  };

  Simon.prototype.newGame = function() {
    _gaq.push([ '_trackPageview', '/simon-game/start' ]);

    this.sequence = [];

    this.newTurn();
  };

  Simon.prototype.updateColorCount = function() {
    this.page.find('#color-count').text(this.sequence.length);
  };

  Simon.prototype.newTurn = function() {
    this.ignorePlayerClicks();

    this.playerSequenceIndex = 0;

    // start Simon's turn
    this.page.attr('class', 'simon-turn');

    this.sequence.push(this.pickRandomColor());

    _gaq.push([ '_trackEvent', 'game', 'newturn', 'score:' + this.sequence.length, 1 ]);
    this.updateColorCount();

    this.replayColorAt(0);
  };

  Simon.prototype.ignorePlayerClicks = function() {
    this.tiles.off('click');
  };

  Simon.prototype.pickRandomColor = function() {
    var odd = Math.random();

    if (odd < 0.25) {
      return 'blue';
    } else if (odd < 0.5) {
      return 'red';
    } else if (odd < 0.75) {
      return 'green';
    } else {
      return 'yellow';
    }
  };

  Simon.prototype.replayColorAt = function(index) {
    if (index < this.sequence.length) {
      var _ref = this;
      var tile = this.tiles.filter('[id=' + this.sequence[index] + ']');

      tile.addClass('flash');

      setTimeout(function() {
        // this should trigger approximately when the animation ended
        tile.removeClass('flash');

        setTimeout(function() {
          // let 50ms to the browser to effectively remove 'flash' CSS class before adding it back
          // (if it's immediately added to the same DOM element the 2nd animation won't trigger)
          _ref.replayColorAt(index + 1);
        }, 50);
      }, 1000);
    } else {
      // start player's turn
      this.listenToPlayerClicks();

      this.page.attr('class', 'player-turn');
    }
  };

  Simon.prototype.listenToPlayerClicks = function() {
    var _ref = this;
    this.tiles.on('click', function(e) {
      _ref.playerPicked(e.currentTarget.id);
    });
  };

  Simon.prototype.playerPicked = function(color) {
    if (this.verifyColor(color)) {
      this.playerSequenceIndex++;

      if (this.playerSequenceIndex === this.sequence.length) {
        this.newTurn();
      }
    } else {
      this.endGame();
    }
  };

  Simon.prototype.verifyColor = function(color) {
    return this.sequence[this.playerSequenceIndex] === color;
  };

  Simon.prototype.endGame = function() {
    _gaq.push([ '_trackPageview', '/simon-game/end' ]);
    _gaq.push([ '_trackEvent', 'game', 'end', 'score:' + this.sequence.length, 1 ]);

    this.ignorePlayerClicks();

    this.page.attr('class', 'game-over');
  };

  return Simon;
});
