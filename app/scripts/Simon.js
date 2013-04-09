define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.page = page;
    this.sequence = [];
  };

  Simon.prototype.updateColorCount = function() {
    this.page.find('#color-count').text(this.sequence.length);
  };

  Simon.prototype.newTurn = function() {
    this.sequence.push(this.pickRandomColor());

    this.updateColorCount();
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
