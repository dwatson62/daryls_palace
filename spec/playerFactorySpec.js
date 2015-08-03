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

});