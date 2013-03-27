define(['app/Simon', 'lib/sinon-1.6.0'], function (Simon) {
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

  describe("On Simon's turn", function() {
    var game = null;

    before(function() {
      // arrange
      game = new Simon();
      game.pickRandomColor = sinon.spy(game, 'pickRandomColor');

      // act
      game.newTurn();
    });

    // assert
    it('Simon should pick a color randomly', function() {
      game.pickRandomColor.callCount.should.equal(1);
    });

    it("Simon should add this color at the end of his sequence", function() {
      game.sequence.should.have.length(1);
    });

    it('the new color Simon added to his sequence should be either blue, red, green or yellow', function() {
      [ 'blue', 'red', 'yellow', 'green' ].should.include(game.sequence[0]);
    });
  });
});
