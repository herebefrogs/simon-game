define(['app/Simon', 'lib/sinon-1.6.0'], function (Simon) {
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

  describe('New round', function() {
    var simon = page = null;

    before(function() {
      // arrange
      page = $('<div>');
      page.append('<span id="round"></span>');

      simon = new Simon(page);
      simon.sequence = [ 'blue', 'red', 'red' ];
      simon.pickRandomColor = sinon.spy(simon, 'pickRandomColor');
      simon.replaySequence = sinon.spy();

      // act
      simon.nextRound();
    });

    // assert
    it('a new color/sound should be randomly picked', function() {
      simon.pickRandomColor.calledOnce.should.equal(true);
    });

    it('the color/sound sequence should contain 1 more entry', function() {
      simon.sequence.should.have.length(4);
    });

    it('the round number should have increased by 1', function() {
      simon.getRoundNo().should.equal(4);
    });

    it('the round number should update on the page', function() {
      page.find('#round').text().should.equal('4');
    });

    it('the color/sound sequence should be replayed in its entirety', function() {
      simon.replaySequence.calledOnce.should.equal(true);
    });
  });
});
