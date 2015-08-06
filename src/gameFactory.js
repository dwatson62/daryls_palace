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
    if (card.substring(1) == '10') { return 10; }
    card = card.split('')[1];
    if (card == "J" || card == "Q" || card == "K") { return 10; }
    if (card == "A") { return 11; }
    return parseInt(card);
  };

  Game.prototype.pointsTotal = function(cards) {
    var total = 0;
    var aceCount = 0;
    for (x in cards) {
      if (this.cardValue(cards[x]) == 11) { aceCount += 1; }
      total += this.cardValue(cards[x]);
      if (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount -= 1;
      }
      if (total > 21 && aceCount == 0) { return 'Bust'; }
    }
    return total;
  };
6
  Game.prototype.winnings = function(player) {
    var winnings = player.currentBet * 2
    player.balance += winnings;
    return winnings;
  };

  Game.prototype.draw = function(player) {
    var amount = (player.currentBet / player.splitCards.length);
    player.balance += amount;
  };

  Game.prototype.blackjack = function(player) {
    var winnings = (player.currentBet * 2.5) + player.currentBet
    player.balance += winnings;
    return winnings;
  };

  return Game;

});
