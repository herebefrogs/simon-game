define(['app/Simon', 'lib/sinon-1.6.0'], function (Simon) {
  describe('On game start', function () {
    var game = null;

    before(function() {
      // arrange
      _gaq = [];
      sinon.spy(_gaq, 'push');

      var page = $('<div>');
      game = new Simon(page);
      game.newTurn = sinon.spy();

      // act
      game.newGame();
    });

    // assert
    it("Simon's color sequence should be empty", function() {
      game.sequence.should.have.length(0);
    });

    it('Simon should start a new tun', function() {
      game.newTurn.callCount.should.equal(1);
    });

    it('Simon should track a "start" page view', function() {
      _gaq.push.calledWith([ '_trackPageview', '/simon-game/start' ]).should.equal(true);
    });
  });

  describe("On Simon's turn", function() {
    describe("When Simon's turn starts", function() {
      var game = page = null;

      before(function() {
        // arrange
        _gaq = [];
        sinon.spy(_gaq, 'push');

        page = $('<div class="">');
        page.append('<span id="color-count"></span>');
        page.append('<div id="blue" class="tile"></div>' +
                    '<div id="red" class="tile"></div>' +
                    '<div id="green" class="tile"></div>' +
                    '<div id="yellow" class="tile"></div>');

        game = new Simon(page);
        game.sequence = [];
        game.ignorePlayerClicks = sinon.spy();
        game.pickRandomColor = sinon.spy(game, 'pickRandomColor');
        game.replayColorAt = sinon.spy(game, 'replayColorAt');

        // act
        game.newTurn();
      });

      // assert
      it("the page should indicate it's Simon's turn", function() {
        page.attr('class').should.equal('simon-turn');
      });

      it('Simon should stop listening to player clicks', function() {
        game.ignorePlayerClicks.callCount.should.equal(1);
      });

      it("Simon should empty the player's color sequence", function() {
        game.playerSequenceIndex.should.equal(0);
      });

      it('Simon should pick a color randomly', function() {
        game.pickRandomColor.callCount.should.equal(1);
      });

      it("Simon should add this color at the end of his sequence", function() {
        game.sequence.should.have.length(1);
      });

      it('the new color Simon added to his sequence should be either blue, red, green or yellow', function() {
        [ 'blue', 'red', 'yellow', 'green' ].should.include(game.sequence[0]);
      });

      it("the page should update the number of colors in Simon's sequence", function() {
        page.find('#color-count').text().should.equal('1');
      });

      it('Simon should start replaying his color sequence from the beginning', function() {
        game.replayColorAt.firstCall.args[0].should.equal(0);
      });

      it('Simon should animate the tile matching the new color', function() {
        page.find('#' + game.sequence[0]).hasClass('flash').should.equal(true);
      });

      it('Simon should track a "newturn" event with current score', function() {
        _gaq.push.calledWith([ '_trackEvent', 'game', 'newturn', 'score:1', 1 ]).should.equal(true);
      });
    });

    describe('When the sequence plays back', function() {
      var game = page = clock = null;

      before(function() {
        // arrange
        page = $('<div>')
        page.append('<div id="blue" class="tile flash"></div>' +
                    '<div id="red" class="tile"></div>' +
                    '<div id="green" class="tile"></div>' +
                    '<div id="yellow" class="tile"></div>');

        game = new Simon(page);
        game.sequence = ['blue', 'red'];
        game.replayColorAt = sinon.spy(game, 'replayColorAt');
        clock = sinon.useFakeTimers();

        // act
        game.replayColorAt(0);
        clock.tick(1250);
      });

      it('Simon should be done animating the tile matching the previous color', function() {
        page.find('#blue').hasClass('flash').should.equal(false);
      });

      it('Simon should replay the next color in his sequence', function() {
        game.replayColorAt.callCount.should.equal(2);
        expect(game.replayColorAt.secondCall.args[0]).to.equal(1);
      });

      it('Simon should animate the tile matching the next color', function() {
        page.find('#red').hasClass('flash').should.equal(true);
      });
    });

    describe('When the player clicks while the sequence plays back', function() {
      var game = null;

      before(function() {
        // arrange
        page = $('<div>');
        page.append('<div id="blue" class="tile"></div>');

        game = new Simon(page);
        page.find('#blue').on('click', function() {
          game.playerPicked('blue');
        });
        game.playerPicked = sinon.spy();

        // act
        game.ignorePlayerClicks();
        page.find('#blue').click();
      });

      it('Simon should not be told the player picked a tile', function() {
        game.playerPicked.callCount.should.equal(0);
      });
    });

    describe('When the sequence playback completes', function() {
      var game = null;

      before(function() {
        // arrange
        page = $('<div class="simon-turn">')

        game = new Simon(page);
        game.sequence = ['blue', 'red'];
        game.replayColorAt = sinon.spy(game, 'replayColorAt');
        game.listenToPlayerClicks = sinon.spy();
        clock = sinon.useFakeTimers();

        // act
        game.replayColorAt(2);
        clock.tick(1250);
      });

      it('Simon should be done replaying the color sequence', function() {
        game.replayColorAt.callCount.should.equal(1);
      });

      it('Simon should start listening to player clicks', function() {
        game.listenToPlayerClicks.callCount.should.equal(1);
      });

      it("the page should indicate it's the player's turn", function() {
        page.attr('class').should.equal('player-turn');
      });
    });
  });

  describe("On player's turn", function() {
    describe("When the player clicks a tile", function() {
      var game = null;

      before(function() {
        // arrange
        page = $('<div>');
        page.append('<div id="blue" class="tile"></div>');

        game = new Simon(page);
        game.playerPicked = sinon.spy();

        // act
        game.listenToPlayerClicks();
        page.find('#blue').click();
      });

      it('Simon should be told the player picked a tile', function() {
        game.playerPicked.callCount.should.equal(1);
      });

      it('Simon should be told what color the tile was', function() {
        game.playerPicked.firstCall.args[0].should.equal('blue');
      });
    });

    describe("When the player matches a color somewhere in Simon's sequence", function() {
      var game = null;

      before(function() {
        // arrange
        page = $('<div>');

        game = new Simon(page);
        game.sequence = [ 'blue', 'red' ];
        game.playerSequenceIndex = 0;
        game.verifyColor = sinon.spy(game, 'verifyColor');

        // act
        game.playerPicked('blue');
      });

      it('Simon should verify the color against his color sequence', function() {
        game.verifyColor.callCount.should.equal(1);
      });

      it("Simon should add this color at the end of the player's sequence", function() {
        game.playerSequenceIndex.should.equal(1);
      });
    });

    describe("When the player misses a color in Simon's sequence", function() {
      var game = null;

      before(function() {
        // arrange
        _gaq = [];
        sinon.spy(_gaq, 'push');

        page = $('<div class="player-turn">');

        game = new Simon(page);
        game.sequence = [ 'blue', 'red' ];
        game.playerSequenceIndex = 0;
        game.verifyColor = sinon.spy(game, 'verifyColor');
        game.endGame = sinon.spy(game, 'endGame');
        game.ignorePlayerClicks = sinon.spy();

        // act
        game.playerPicked('yellow');
      });

      it('Simon should verify the color against his color sequence', function() {
        game.verifyColor.callCount.should.equal(1);
      });

      it('Simon should end the game', function() {
        game.endGame.callCount.should.equal(1);
      });

      it('Simon should stop listening to player clicks', function() {
        game.ignorePlayerClicks.callCount.should.equal(1);
      });

      it("the page should indicate the game is over", function() {
        page.attr('class').should.equal('game-over');
      });

      it('Simon should track a "end" page view', function() {
        _gaq.push.calledWith([ '_trackPageview', '/simon-game/end' ]).should.equal(true);
      });

      it('Simon should track a "end" event with final score', function() {
        _gaq.push.calledWith([ '_trackEvent', 'game', 'end', 'score:2', 1 ]).should.equal(true);
      });
    });

    describe("When the player matches the last color in Simon's sequence", function() {
      var game = null;

      before(function() {
        // arrange
        page = $('<div>');

        game = new Simon(page);
        game.sequence = [ 'blue', 'red' ];
        game.playerSequenceIndex = 1;
        game.newTurn = sinon.spy();

        // act
        game.playerPicked('red');
      });

      it('Simon should start a new turn', function() {
        game.newTurn.callCount.should.equal(1);
      });
    });
  });

  describe('On game end', function() {
    describe('When the player clicks the restart button', function () {
      var game = null;
      before(function() {
        // arrange
        _gaq = [];
        sinon.spy(_gaq, 'push');

        var page = $('<div class="game-over">');
        page.append('<button class="restart">Restart</button>');

        game = new Simon(page);
        game.newGame = sinon.spy();

        // act
        page.find('.restart').click();
      });

      it('Simon should start a new game', function() {
        game.newGame.callCount.should.equal(1);
      });

      it('Simon should track a "restart" page view', function() {
        _gaq.push.calledWith([ '_trackPageview', '/simon-game/restart' ]).should.equal(true);
      });
    });
  });
});
