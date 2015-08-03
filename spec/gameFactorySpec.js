describe('Blackjack Factory', function() {

  beforeEach(module('blackjack'));

  var game;

  beforeEach(inject(function(gameFactory) {
    game = new gameFactory();
  }));

  it('is defined', function() {
    expect(game).toBeDefined();
  });

  it('each deck has 52 cards', function() {
    console.log(game.deck)
    expect(game.deck.length).toEqual(52);
  });

});