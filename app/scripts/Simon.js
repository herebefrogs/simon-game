define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.page = page;
    this.sequence = [];

    var _ref = this;
    page.find('.tile').on('click', function(e) {
      _ref.playerPicked(e.currentTarget.id);
    });
  };

  Simon.prototype.updateColorCount = function() {
    this.page.find('#color-count').text(this.sequence.length);
  };

  Simon.prototype.newTurn = function() {
    this.playerSequenceIndex = 0;

    this.sequence.push(this.pickRandomColor());

    this.updateColorCount();

    this.replayColorAt(0);
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
      var tile = this.page.find('#' + this.sequence[index]);

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
    }
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
  };

  return Simon;
});
