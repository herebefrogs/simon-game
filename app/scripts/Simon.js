define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.sequence = [];
    this.buttons_el = page.find('.button');
    this.round_el = page.find('#round');
    this.game_over_el = page.find('#game-over');

    this.game_over_el.hide();
    this.updateRoundNo();
    this.resetPlayerIndex();
  };

  Simon.prototype.getRoundNo = function() {
    return this.sequence.length;
  };

  Simon.prototype.listenToPlayerClicks = function() {
    var _ref = this;
    page.find('.button').on('click', function(e) {
      _ref.playerPicked(e.currentTarget.id);
    });
  };

  Simon.prototype.stopListeningToPlayerClicks = function() {
    page.find('.button').off('click');
  };

  Simon.prototype.resetPlayerIndex = function() {
    this.playerIndex = 0;
  };

  Simon.prototype.pickRandomColor = function() {
    var odd = Math.random();

    if (odd < 0.25) {
      return 'red';
    } else if (odd < 0.5) {
      return 'green';
    } else if (odd < 0.75) {
      return 'yellow';
    } else {
      return 'blue';
    }
  };

  Simon.prototype.replaySequence = function(i) {
    if (i < this.sequence.length) {
      var _ref = this;

      this.buttons_el
        .filter('[id=' + this.sequence[i] + ']')
        .addClass('flash')
        .one('animationend MSAnimationEnd webkitAnimationEnd', function() {
          this.removeClass('flash');

          setTimeout(function() {
            _ref.replaySequence(i + 1);
          }, 100);
        }
      );
    } else {
      this.listenToPlayerClicks();
    }
  };

  Simon.prototype.updateRoundNo = function() {
    this.round_el.text(this.getRoundNo());
  };

  Simon.prototype.nextRound = function() {
    this.stopListeningToPlayerClicks();

    this.resetPlayerIndex();

    this.sequence.push(this.pickRandomColor());

    this.updateRoundNo();

    this.replaySequence(0);
  };

  Simon.prototype.verifyPick = function(color, i) {
    return this.sequence[i] === color;
  };

  Simon.prototype.gameOver = function() {
    this.stopListeningToPlayerClicks();

    this.game_over_el.show();
  };

  Simon.prototype.playerPicked = function(color) {
    if (this.verifyPick(color, this.playerIndex)) {
      this.playerIndex++;

      if (this.playerIndex === this.sequence.length) {
        this.nextRound();
      }
    } else {
      this.gameOver();
    }
  };

  return Simon;
});
