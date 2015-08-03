blackjackGame.factory('gameFactory', function() {

  var Game = function() {
    this.deck = []
    this.createDeck();
  };

  Game.prototype.createDeck = function() {
    var suits = ["D", "H", "C", "S"];
    for(x in suits) { this.createSuit(suits[x]); }
  };

  Game.prototype.createSuit = function(suit) {
    for (x = 2; x < 11; x ++) {
      number = x.toString();
      this.deck.push(suit + number)
    }
    var faces = ["J", "Q", "K", "A"];
    for (x in faces) { this.deck.push(suit + faces[x]); }
  };

  Game.prototype.dealOne = function() {
    x = Math.floor(Math.random() * 52);
    return this.deck[x];
  };

  Game.prototype.cardValue = function(card) {
    card = card.split('')[1];
    if (card == "J" || card == "Q" || card == "K") { return 10; }
    return parseInt(card);
  };

  return Game;

});
