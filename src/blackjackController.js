blackjackGame.controller('BlackjackController', ['gameFactory', 'playerFactory', '$timeout', function(gameFactory, playerFactory, $timeout) {

  var self = this;
  var player = new playerFactory();
  var dealer = new playerFactory();
  var game = new gameFactory();

  self.game = game;
  self.playerBalance = '£' + player.balance;

  // for development

  self.gimmeASplit = function() {
    self.clearPreviousRound();
    self.toggleShuffleDeck;
    self.playerTurn = true;
    self.bet(10);
    // dealer gets D3
    dealer.currentCards = [[game.deck[1]]]
    self.dealerCards = dealer.currentCards;
    self.calculateScore(dealer);
    // returns D5 and H5
    player.currentCards = [[game.deck[3], game.deck[16]]]
    self.playerCards = player.currentCards;
    self.calculateScore(player);
  };

  self.toggleShuffleDeck = function() {
    game.canShuffle = false;
  };

  self.showDoubleDownButton = function() {
    if (self.playerScore < 14 && self.playerTurn === true) { return true; }
    return false;
  };

  self.showSplitButton = function() {
    if (player.canSplit() === true && self.playerTurn === true) { return true; }
    return false;
  };

  self.startRound = function(amount) {
    self.clearPreviousRound();
    self.playerTurn = true;
    self.bet(amount);
    self.dealerHit();
    self.hit(0);
    self.hit(0);
  };

  self.clearPreviousRound = function() {
    self.dealerTurn = false;
    self.blackjackResult = null;
    player.clearRound();
    dealer.clearRound();
    self.result = null;
  };

  self.bet = function(amount) {
    player.bet(amount);
    self.playerBalance = '£' + player.balance;
  };

  self.dealerHit = function() {
    dealer.getCard(game, 0);
    self.dealerCards = dealer.currentCards;
    self.calculateScore(dealer, 0);
  };

  self.dealersTurn = function() {
    self.dealerTurn = true;
    while (self.dealerScore < 17) { self.dealerHit(); }
    self.determineWinner();
  };

  self.hit = function() {
    player.getCard(game);
    self.playerCards = player.currentCards;
    self.calculateScore(player, 0);
    if (self.playerScore == 'Bust' || self.playerScore === 21) { self.stand(); }
  };

  self.stand = function() {
    // next player turn
    var result = player.stand(game)
    if (result === 'done') {
      self.playerTurn = false;
      self.dealersTurn();
    }
  };

  self.doubleDown = function() {
    player.doubleDown(game);
    self.playerCards = player.currentCards;
    self.calculateScore(player);
    self.playerBalance = '£' + player.balance;
    self.stand(0);
  };

  self.split = function() {
    self.playerCards = player.split();
    self.playerBalance = '£' + player.balance;
    self.hit(0);
  };

  self.calculateScore = function(user) {
    var cards = user.currentCards[user.handIndex];
    var total = game.pointsTotal(cards)
    if (user === player) {
      self.playerScore = total;
    } else if (user === dealer) { self.dealerScore = total; }
    if (total === 21 && user.currentCards[handIndex].length === 2) {
      self.blackjacks();
    }
  };

  self.blackjacks = function() {
    self.blackjackResult = 'Blackjack!';
    var winnings = game.blackjack(player);
    self.playerBalance = '£' + player.balance;
    self.result = 'Player wins £' + winnings;
  };

  self.determineWinner = function() {
    for (x in player.currentCards) {
      var total = game.pointsTotal(player.currentCards[x]);
      if ( self.dealerScore === total) { self.isADraw(); }
      else if (total > self.dealerScore ||
        (self.dealerScore === 'Bust' && total != 'Bust')) {
          self.playerWins();
        }
      else { self.result = 'You lose'; }
    }
  };

  self.isADraw = function() {
    self.result = 'Draw';
    game.draw(player);
    self.playerBalance = '£' + player.balance;
  };

  self.playerWins = function() {
    var winnings = game.winnings(player);
    self.playerBalance = '£' + player.balance;
    self.result = 'Player wins £' + winnings;
  };

}]);