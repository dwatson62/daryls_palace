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

  xit('can double down', function() {

  });

});