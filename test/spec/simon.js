define(['app/Simon', 'lib/sinon-1.6.0'], function (Simon) {
  describe('Initial state', function () {
    var simon = page = null;

    before(function() {
      // arrange
      page = $('<div>');
      page.append('<span id="round"></span><div id="game-over"></div>');

      // act
      simon = new Simon(page);
    });

    // assert
    it('the color/sound sequence should be empty', function() {
      simon.sequence.should.have.length(0);
    });

    it('the player sequence should be empty', function() {
      simon.playerIndex.should.equal(0);
    });

    it('the round number should be 0', function() {
      simon.getRoundNo().should.equal(0);
    });

    it('the round number should be displayed on the page', function() {
      page.find('#round').text().should.equal('0');
    });

    it('the "Game over" message should be hidden', function() {
      page.find('#game-over').css('display').should.equal('none');
    });
  });

  describe('New round', function() {
    describe("Simon's turn", function() {
      var simon = page = null;

      before(function() {
        // arrange
        page = $('<div>');
        page.append('<span id="round"></span>');

        simon = new Simon(page);
        simon.sequence = [ 'blue', 'red', 'red' ];
        simon.playerIndex = 2;
        simon.pickRandomColor = sinon.spy(simon, 'pickRandomColor');
        simon.replaySequence = sinon.spy();

        // act
        simon.nextRound();
      });

      // assert
      it('the player sequence should be emptied', function() {
        simon.playerIndex.should.equal(0);
      });

      it('a new color/sound should be randomly picked', function() {
        simon.pickRandomColor.calledOnce.should.equal(true);
      });

      it('the color/sound sequence should contain 1 more entry', function() {
        simon.sequence.should.have.length(4);
      });

      it('the new entry should be one of the four possible colors/sounds', function() {
        [ 'blue', 'red', 'yellow', 'green' ].should.include(simon.sequence[3]);
      });

      it('the round number should have increased by 1', function() {
        simon.getRoundNo().should.equal(4);
      });

      it('the round number should update on the page', function() {
        page.find('#round').text().should.equal('4');
      });

      it('the color/sound sequence should be replayed in its entirety', function() {
        simon.replaySequence.calledWith(0).should.equal(true);
      });
    });


    describe("Player's turn", function() {
      describe('When the player pick the correct color', function() {
        var simon = null;

        before(function() {
          // arrange
          simon = new Simon($('<div>'));
          simon.sequence = [ 'blue', 'red', 'red' ];
          simon.playerIndex = 0;
          simon.verifyPick = sinon.spy(simon, 'verifyPick');
          simon.nextRound = sinon.spy();

          // act
          simon.playerPicked('blue');
        });

        // assert
        it("Simon should verify the player's pick against the color/sound sequence", function() {
          simon.verifyPick.callCount.should.equal(1);
        });

        it('the player sequence should contain 1 more entry', function() {
          simon.playerIndex.should.equal(1);
        });

        it("Simon should not move on to the next round", function() {
          simon.nextRound.callCount.should.equal(0);
        });
      });

      describe('When the player successfully completes the color/sound sequence', function() {
        var simon = null;

        before(function() {
          // arrange
          simon = new Simon($('div'));
          simon.sequence = [ 'blue', 'red', 'red' ];
          simon.playerIndex = 2;
          simon.nextRound = sinon.spy();

          // act
          simon.playerPicked('red');
        });

        // assert
        it("Simon should move on to the next round", function() {
          simon.nextRound.callCount.should.equal(1);
        });
      });

      describe('When the player pick the wrong color', function() {
        var simon = null;

        before(function() {
          // arrange
          simon = new Simon($('<div>'));
          simon.sequence = [ 'blue', 'red', 'red' ];
          simon.playerIndex = 1;
          simon.verifyPick = sinon.spy(simon, 'verifyPick');
          simon.nextRound = sinon.spy();
          simon.gameOver = sinon.spy();

          // act
          simon.playerPicked('green');
        });

        // assert
        it("Simon should verify the player's pick against the color/sound sequence", function() {
          simon.verifyPick.callCount.should.equal(1);
        });

        it('the player sequence should not contain 1 more entry', function() {
          simon.playerIndex.should.equal(1);
        });

        it("Simon should not move on to the next round", function() {
          simon.nextRound.callCount.should.equal(0);
        });

        it("Simon should end the game", function() {
          simon.gameOver.callCount.should.equal(1);
        });
      });
    });
  });

  describe('Game over', function() {
    var simon = page = null;

    before(function() {
      // arrange
      page = $('<div>');
      page.html('<div id="game-over" style="display: none;"></div>');

      simon = new Simon(page);

      // act
      simon.gameOver();
    });

    // assert
    it('the "Game over" message should be visible', function() {
      page.find('#game-over').css('display').should.not.equal('none');
    });
  });
});
