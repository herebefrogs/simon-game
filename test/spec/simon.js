define(['app/Simon'], function (Simon) {
  describe('Initial state', function () {
    var simon = page = null;

    before(function() {
      // arrange
      page = $('<div>');
      page.append('<span id="round"></span>');

      // act
      simon = new Simon(page);
    });

    // assert
    it('the color/sound sequence should be empty', function() {
      simon.sequence.should.have.length(0);
    });

    it('the round number should be 0', function() {
      simon.getRoundNo().should.equal(0);
    });

    it('the round number should be displayed on the page', function() {
      page.find('#round').text().should.equal('0');
    });
  });
});
