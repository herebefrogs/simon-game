define(['app/Simon'], function (Simon) {
  describe('On game start', function () {
    var game = null;

    // act
    before(function() {
      game = new Simon();
    });

    // assert
    it("Simon's color sequence should be empty", function() {
      game.sequence.should.have.length(0);
    });
  });
});
