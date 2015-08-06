describe('Player Factory', function() {

  beforeEach(module('blackjack'));

  var player;
  var game;

  beforeEach(inject(function(gameFactory, playerFactory) {
    player = new playerFactory();
    game = new gameFactory();
  }));

  it('is defined', function() {
    expect(player).toBeDefined();
  });

  it('can receive a random card', function() {
    player.getCard(game);
    expect(player.currentCards.length).toEqual(1);
  });

  it('has a starting balance of 100', function() {
    expect(player.balance).toEqual(100);
  });

  it('can place a bet', function() {
    player.bet(10);
    expect(player.currentBet).toEqual(10);
  });

  it('can place a bet and have it deducted from their balance', function() {
    player.bet(10);
    expect(player.balance).toEqual(90);
  });

  it('when player wins they double their stake', function() {
    player.bet(10);
    game.winnings(player);
    expect(player.balance).toEqual(110);
  });

  it('when player draws they get their stake back', function() {
    player.bet(10);
    game.draw(player);
    expect(player.balance).toEqual(100);
  });

  it('when player gets a blackjack they win 2.5x their stake', function() {
    player.bet(10);
    game.blackjack(player);
    expect(player.balance).toEqual(125);
  });

  it('can double down below 14 and get 1 more card', function() {
    spyOn(Math, 'random').and.returnValue(0.09); // returns D6
    player.getCard(game);
    player.getCard(game);
    expect(player.doubleDown(game)).toEqual('D6');
  });

  describe('Splitting', function() {

    beforeEach(function() {
      spyOn(Math, 'random').and.returnValue(0.12); // returns D8
      player.getCard(game);
      player.getCard(game);
    });

    it('can split when given duplicate card numbers', function() {
      expect(player.canSplit()).toEqual(true);
    });

    it('can split and get an extra card', function() {
      player.split();
      expect(player.splitCards).toEqual([['D8'], ['D8']])
    });

    it('can hit on a split', function() {
      player.split();
      player.splitHit(game, 0);
      expect(player.splitCards).toEqual([['D8', 'D8'], ['D8']]);
    });

    it('can stand on a split and receive that total', function() {
      player.split();
      player.splitHit(game, 0);
      player.splitStand(game, 0);
      expect(game.pointsTotal(player.splitCards[0])).toEqual(16);
    });

    it('can stand on a split and hit on the next split card', function() {
      player.split();
      player.splitHit(game, 0);
      player.splitStand(game, 0);
      player.splitHit(game, 1);
      expect(player.splitCards).toEqual([['D8', 'D8'], ['D8', 'D8']]);
    });


    });

});