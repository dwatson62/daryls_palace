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

  return Game;

});
