define([], function() {
  var Simon = function Simon() {
    this.sequence = [];
  };

  Simon.prototype.newTurn = function() {
    this.sequence.push(this.pickRandomColor());
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

  return Simon;
});
