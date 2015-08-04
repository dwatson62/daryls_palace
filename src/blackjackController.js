blackjackGame.controller('BlackjackController', ['gameFactory', 'playerFactory', '$timeout', function(gameFactory, playerFactory, $timeout) {

  var self = this;
  var player = new playerFactory();
  var dealer = new playerFactory();
  var game = new gameFactory();

  self.blackjackResult;
  self.playerCards = [];
  self.playerScore;
  self.playerBalance = '£' + player.balance;

  self.dealerCards = [];
  self.dealerScore;
  self.dealerTurn = false;

  self.isGameStarted = false;
  self.result;

  self.startRound = function(amount) {
    self.dealerTurn = false;
    self.blackjackResult = null;
    self.playerCards = [];
    self.playerScore = null;
    player.nextRound();
    self.dealerCards = [];
    self.dealerScore = null;
    dealer.nextRound();
    self.result = null;
    self.isGameStarted = true;
    self.bet(amount);
    self.dealerHit();
    self.hit();
    self.hit();
  };

  self.bet = function(amount) {
    player.bet(amount);
    self.playerBalance = '£' + player.balance;
  };

  self.hit = function() {
    var card = player.getCard(game);
    self.playerCards.push( { 'card': card, 'src': '/images/cards/' + card + '.png' } );
    self.calculatePlayerScore();
    if (self.playerScore == 21 && self.playerCards.length == 2) {
      self.blackjacks();
    }
    if (self.playerScore == 21) { self.stand(); }
  };

  self.stand = function() {
    // next player turn
    self.isGameStarted = false;
    self.dealersTurn();
  };

  self.calculatePlayerScore = function() {
    self.playerScore = game.pointsTotal(player.currentCards);
    if (self.playerScore == 'Bust') { self.stand(); }
  };

  self.blackjacks = function() {
    self.blackjackResult = 'Blackjack!';
    game.blackjack(player);
    self.playerBalance = '£' + player.balance;
  };

  self.dealersTurn = function() {
    self.dealerTurn = true;
    while (self.dealerScore < 17) {
      // $timeout(function() {
        self.dealerHit();
      // }, 300);
    }
    self.determineWinner();
  };

  self.dealerHit = function() {
    var card = dealer.getCard(game);
    self.dealerCards.push( { 'card': card, 'src': '/images/cards/' + card + '.png' } );
    self.calculateDealerScore();
    if (self.dealerScore == 21 && self.dealerCards.length == 2) {
      self.blackjacks();
    }
  };

  self.calculateDealerScore = function() {
    self.dealerScore = game.pointsTotal(dealer.currentCards);
  };

  self.determineWinner = function() {
    if ( self.dealerScore === self.playerScore) { self.isADraw(); }
    else if (self.playerScore > self.dealerScore || (self.dealerScore === 'Bust' && self.playerScore != 'Bust')) {
        self.playerWins();
      }
    else { self.result = 'You lose'; }
  };

  self.isADraw = function() {
    self.result = 'Draw';
    game.draw(player);
  };

  self.playerWins = function() {
    self.result = 'Player wins';
    game.winnings(player);
    self.playerBalance = '£' + player.balance;
  };

}]);