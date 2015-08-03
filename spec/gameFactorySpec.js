describe('Blackjack Factory', function() {

  beforeEach(module('blackjack'));

  var game;

  beforeEach(inject(function(gameFactory) {
    game = new gameFactory();
  }));

  it('is defined', function() {
    expect(game).toBeDefined();
  });

});