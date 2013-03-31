define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.sequence = [];
    this.page = page;
    this.buttons_el = page.find('.button');
    this.round_el = page.find('#round');

    this.updateRoundNo();
    this.resetPlayerIndex();
  };

  Simon.prototype.getRoundNo = function() {
    return this.sequence.length;
  };

  Simon.prototype.listenToPlayerClicks = function() {
    var _ref = this;
    this.buttons_el.on('click', function(e) {
      _ref.playerPicked(e.currentTarget.id);
    });
  };

  Simon.prototype.stopListeningToPlayerClicks = function() {
    this.buttons_el.off('click');
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
          $(this).removeClass('flash');

          setTimeout(function() {
            _ref.replaySequence(i + 1);
          }, 100);
        }
      );
    } else {
      this.page.attr('class', 'player-turn');

      this.listenToPlayerClicks();
    }
  };

  Simon.prototype.updateRoundNo = function() {
    this.round_el.text(this.getRoundNo());
  };

  Simon.prototype.nextRound = function() {
    this.page.attr('class', 'simon-turn');

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
    this.page.attr('class', 'game-over');

    this.stopListeningToPlayerClicks();
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
