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

  it('10 has the correct points value', function() {
    // D2
    var card = game.deck[8]
    expect(game.cardValue(card)).toEqual(10);
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

  it('an Ace has an inital value of 11', function() {
    // DA
    var card = game.deck[12]
    expect(game.cardValue(card)).toEqual(11);
  });

  it('returns the correct total of two cards', function() {

    var cards = [ { 'card': game.deck[0] }, {'card': game.deck[1] } ] // D2 & D3
    expect(game.pointsTotal(cards)).toEqual(5);
  });

  it('knows when the player is bust', function() {
    var cards = [ { 'card': game.deck[10] }, { 'card': game.deck[3] }, { 'card': game.deck[9] } ] // DQ & D5 & DJ (25)
    expect(game.pointsTotal(cards)).toEqual('Bust');
  });

  it('changes Ace value to 1 if player total is over 21', function() {
    var cards = [ { 'card': game.deck[12] }, { 'card': game.deck[3] }, { 'card': game.deck[9] } ] // DA & D5 & DJ (16)
    expect(game.pointsTotal(cards)).toEqual(16);
  });

  it('can still go bust with an Ace', function() {
    var cards = [ { 'card': game.deck[12] }, { 'card': game.deck[3] }, { 'card': game.deck[9] }, { 'card': game.deck[9] } ] // DA & D5 & DJ & DJ (26)
    expect(game.pointsTotal(cards)).toEqual('Bust');
  });

  it('can handle multiple Aces', function() {
    var cards = [ { 'card': game.deck[12] }, { 'card': game.deck[12] }, { 'card': game.deck[3] } ] // DA & DA & D5 (17)
    expect(game.pointsTotal(cards)).toEqual(17);
  });

});