describe('Game Factory', function() {

  beforeEach(module('blackjack'));

  var game;

  beforeEach(inject(function(gameFactory) {
    game = new gameFactory();
  }));

  it('is defined', function() {
    expect(game).toBeDefined();
  });

  it('each deck has 52 cards', function() {
    expect(game.deck.length).toEqual(52);
  });

  it('each number card has the correct points value', function() {
    // D2
    var card = game.deck[0]
    expect(game.cardValue(card)).toEqual(2);
  });

  it('a Jack has a value of 10', function() {
    // DJ
    var card = game.deck[9]
    expect(game.cardValue(card)).toEqual(10);
  });

  it('a Queen has a value of 10', function() {
    // DQ
    var card = game.deck[10]
    expect(game.cardValue(card)).toEqual(10);
  });

  it('a King has a value of 10', function() {
    // DK
    var card = game.deck[11]
    expect(game.cardValue(card)).toEqual(10);
  });

});