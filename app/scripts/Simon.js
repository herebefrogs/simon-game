define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.sequence = [];
    page.find('#round').text(this.getRoundNo());
  };

  Simon.prototype.getRoundNo = function() {
    return this.sequence.length;
  };

  Simon.prototype.pickRandomColor = function() {
  };

  Simon.prototype.replaySequence = function() {
  };

  Simon.prototype.nextRound = function() {
  };

  return Simon;
});
