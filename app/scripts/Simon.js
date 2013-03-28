define(['jquery'], function() {
  var Simon = function Simon(page) {
    this.sequence = [];
    page.find('#round').text(this.getRoundNo());
  };

  Simon.prototype.getRoundNo = function() {
    return this.sequence.length;
  };

  return Simon;
});
