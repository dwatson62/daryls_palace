blackjackGame.controller('BlackjackController', ['gameFactory', 'playerFactory', '$timeout', function(gameFactory, playerFactory, $timeout) {

  var self = this;
  var player = new playerFactory();
  var dealer = new playerFactory();
  var game = new gameFactory();

  self.playerBalance = '£' + player.balance;
  self.playerCards = [];
  self.dealerCards = [];
  self.splitCards = [];

  self.startRound = function(amount) {
    self.clearPreviousRound();
    self.playerTurn = true;
    self.bet(amount);
    self.dealerHit();
    self.hit();
    self.hit();
  };

  self.clearPreviousRound = function() {
    self.dealerTurn = false;
    self.blackjackResult = null;
    self.playerCards = [];
    self.playerScore = null;
    player.nextRound();
    self.dealerCards = [];
    self.dealerScore = null;
    dealer.nextRound();
    self.result = null;
  }

  self.bet = function(amount) {
    player.bet(amount);
    self.playerBalance = '£' + player.balance;
  };

  self.getACard = function(user) {
    var findCard = user.getCard(game);
    var card = { 'src': '/images/cards/' + findCard + '.png' };
    return card;
  };

  self.hit = function() {
    self.playerCards.push( self.getACard(player) );
    self.calculateScore(player);
    if (self.playerScore == 21 && self.playerCards.length == 2) {
      self.blackjacks();
      self.playerTurn = false;
    }
    else if (self.playerScore == 21) { self.stand(); }
  };

  self.stand = function() {
    // next player turn
    self.playerTurn = false;
    self.dealersTurn();
  };

  self.showDoubleDown = function() {
    if (self.playerScore < 14 && self.playerTurn === true) { return true; }
    return false;
  };

  self.showSplit = function() {
    if (player.canSplit() === true && self.playerTurn === true) { return true; }
    return false;
  };

  self.doubleDown = function() {
    var card = player.doubleDown(game);
    self.playerCards.push( { 'card': card, 'src': '/images/cards/' + card + '.png' } );
    self.calculateScore(player);
    self.playerBalance = '£' + player.balance;
    self.stand();
  };

  self.split = function() {
    self.splitCards = player.split();
    self.playerBalance = '£' + player.balance;
    self.splitHit(0);
  };

  self.splitHit = function(index) {
    player.splitHit(game, index);
    self.calculateSplitScore(player);
    if (self.playerScore == 21) { self.splitStand(index); }
  };

  self.splitStand = function(index) {
    if (index === 0) { self.splitHit(1); }
    else { self.stand(); }
  };

  self.calculateSplitScore = function(index) {
    var total = game.pointsTotal(player.splitCards[index]);
    self.playerScore = total;
    if (self.playerScore == 'Bust') { self.splitStand(index); }
  }

  self.calculateScore = function(user) {
    var total = game.pointsTotal(user.currentCards);
    if (user === player) {
      self.playerScore = total;
      if (self.playerScore == 'Bust') { self.stand(); }
    } else if (user === dealer) { self.dealerScore = total; }
  };

  self.blackjacks = function() {
    self.blackjackResult = 'Blackjack!';
    var winnings = game.blackjack(player);
    self.playerBalance = '£' + player.balance;
    self.result = 'Player wins £' + winnings;
  };

  self.dealersTurn = function() {
    self.dealerTurn = true;
    while (self.dealerScore < 17) {
      self.dealerHit();
    }
    self.determineWinner();
  };

  self.dealerHit = function() {
    self.dealerCards.push( self.getACard(dealer) );
    self.calculateScore(dealer);
    if (self.dealerScore == 21 && self.dealerCards.length == 2) {
      self.blackjacks();
    }
  };

  self.prepareFinalCards = function() {
    var finalCards = [];
    if (self.splitCards.length > 0) {
      finalCards = self.splitCards;
    } else { finalCards.push(self.playerCards) }
    return finalCards;
  };

  self.determineWinner = function() {
    var finalCards = self.prepareFinalCards();
    for (x in finalCards) {
      var total = game.pointsTotal(finalCards[x]);
      if ( self.dealerScore === total) { self.isADraw(); }
      else if (total > self.dealerScore || (self.dealerScore === 'Bust' && total != 'Bust')) {
          self.playerWins();
        }
      else {
        self.result = 'You lose';
      }
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