define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.sequence = [];
    this.round_el = page.find('#round');

    this.updateRoundNo();
  };

  Simon.prototype.getRoundNo = function() {
    return this.sequence.length;
  };

  Simon.prototype.pickRandomColor = function() {
  };

  Simon.prototype.replaySequence = function() {
  };

  Simon.prototype.updateRoundNo = function() {
    this.round_el.text(this.getRoundNo());
  };

  Simon.prototype.nextRound = function() {
    this.sequence.push(this.pickRandomColor());

    this.updateRoundNo();

    this.replaySequence();
  };

  return Simon;
});
