describe('Player Factory', function() {

  beforeEach(module('blackjack'));

  var player;
  var game;

  beforeEach(inject(function(gameFactory, playerFactory) {
    player = new playerFactory();
    game = new gameFactory();
    game.canShuffle = false;
  }));

  it('is defined', function() {
    expect(player).toBeDefined();
  });

  it('can receive a random card', function() {
    player.getCard(game);
    expect(player.currentCards[0].length).toEqual(1);
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
    spyOn(game, 'dealOne').and.returnValue('D6');
    player.getCard(game);
    player.getCard(game);
    expect(player.doubleDown(game)).toEqual('D6');
  });

  describe('Splitting', function() {

    beforeEach(function() {
      spyOn(game, 'dealOne').and.returnValue('D8');
      game.canShuffle = false;
      player.getCard(game);
      player.getCard(game);
    });

    it('can split when given duplicate card numbers', function() {
      expect(player.canSplit()).toEqual(true);
    });

    it('cannot split more than once', function() {
      player.split();
      player.getCard(game);
      expect(player.canSplit()).toEqual(false);
    });

    it('can split and get an extra card', function() {
      player.split();
      expect(player.currentCards).toEqual([['D8'], ['D8']]);
    });

    it('can hit on a split', function() {
      player.split();
      player.getCard(game);
      expect(player.currentCards).toEqual([['D8', 'D8'], ['D8']]);
    });

    it('can stand on a split and receive that total', function() {
      player.split();
      player.getCard(game);
      player.stand(game);
      expect(game.pointsTotal(player.currentCards[0])).toEqual(16);
    });

    it('when stands on a first split card, automatically hit on the next', function() {
      player.split();
      player.getCard(game);
      player.stand(game);
      expect(player.currentCards).toEqual([['D8', 'D8'], ['D8', 'D8']]);
    });

    it('can stand on a split and hit on the next split card', function() {
      player.split();
      player.getCard(game);
      player.stand(game);
      player.getCard(game);
      expect(player.currentCards).toEqual([['D8', 'D8'], ['D8', 'D8', 'D8']]);
    });

  });

});