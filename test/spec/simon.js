define(['app/Simon'], function (Simon) {
  describe('Initial state', function () {
    var simon = null;

    // act
    before(function() {
      simon = new Simon();
    });

    // assert
    it('the color/sound sequence should be empty', function() {
      simon.sequence.should.have.length(0);
    });

    it('the round number should be 0', function() {
      simon.getRoundNo().should.equal(0);
    });
  });
});
