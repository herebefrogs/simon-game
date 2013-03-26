define([], function() {
  var Simon = function Simon() {
    this.sequence = [];
  };

  Simon.prototype.newTurn = function() {
    this.sequence.push(this.pickRandomColor());
  };

  Simon.prototype.pickRandomColor = function() {
  };

  return Simon;
});
