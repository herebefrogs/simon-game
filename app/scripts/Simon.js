define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.sequence = [];
    this.buttons_el = page.find('.controls');
    this.round_el = page.find('#round');

    this.updateRoundNo();
    this.resetPlayerIndex();
  };

  Simon.prototype.getRoundNo = function() {
    return this.sequence.length;
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
      var button_el = this.buttons_el.find('#' + this.sequence[i]);

      button_el
        .addClass('flash')
        .one('animationend MSAnimationEnd webkitAnimationEnd', function() {
          button_el.removeClass('flash');

          setTimeout(function() {
            _ref.replaySequence(i + 1);
          }, 100);
        }
      );
    }
  };

  Simon.prototype.updateRoundNo = function() {
    this.round_el.text(this.getRoundNo());
  };

  Simon.prototype.nextRound = function() {
    this.resetPlayerIndex();

    this.sequence.push(this.pickRandomColor());

    this.updateRoundNo();

    this.replaySequence(0);
  };

  return Simon;
});
