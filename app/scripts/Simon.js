define([], function() {
  var Simon = function Simon() {
    this.sequence = [];
  };

  Simon.prototype.getRoundNo = function() {
    return this.sequence.length;
  };

  return Simon;
});
