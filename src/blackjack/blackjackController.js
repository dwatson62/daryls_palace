blackjackGame.controller('BlackjackController', ['gameFactory', 'playerFactory', 'hintFactory', '$http', function(gameFactory, playerFactory, hintFactory, $http) {

  var self = this;
  var player = new playerFactory();
  var computer = new playerFactory();
  var dealer = new playerFactory();
  var game = new gameFactory();
  var hint = new hintFactory();

  self.game = game;
  self.cardCountingTotal = 0;
  self.onePlayerGame = false;

  self.initUser = function(id, balance) {
    self.userID = id;
    player.balance = balance;
    self.playerBalance = '£' + player.balance;
  };

  self.saveBalance = function() {
    var data = { "balance": player.balance };
    $http.put('/users/' + self.userID, data);
  };

    // This method is only used for developing the split functionality
    // It returns two duplicate value cards for the player
    // So they are able to split on the first game

    self.gimmeASplit = function() {
      self.clearPreviousRound();
      self.toggleShuffleDeck();
      self.playerTurn = true;
      self.bet(10);
      // dealer gets D3
      dealer.currentCards = [[game.deck[1]]];
      self.dealerCards = dealer.currentCards;
      self.calculateScore(dealer);
      // returns D5 and H5
      player.currentCards = [[game.deck[3], game.deck[16]]];
      self.playerCards = player.currentCards;
      self.calculateScore(player);
      if (self.onePlayerGame === false) {
        self.computerPlayerHit();
        self.computerPlayerHit();
      }
    };

  self.toggleShuffleDeck = function() {
    game.canShuffle = false;
  };

  self.toggleOnePlayerGame = function() {
    self.onePlayerGame = true;
  };

  self.shuffleShoe = function() {
    if (game.deck.length < 12) {
      game.createDeck();
      self.displayHint = 'Shuffling the shoe';
      self.cardCountingTotal = 0;
    }
  };

  self.cardCounting = function(card) {
    var value = game.cardValue(card);
    if (value <= 6) { self.cardCountingTotal += 1; }
    if (value >= 10) { self.cardCountingTotal -= 1; }
    console.log(self.cardCountingTotal);
  };

  self.showDoubleDownButton = function() {
    if (player.canDouble(game) === true && self.playerTurn === true) { return true; }
    return false;
  };

  self.showSplitButton = function() {
    if (player.canSplit() === true && self.playerTurn === true) { return true; }
    return false;
  };

  self.showHintButton = function() {
    if (self.playerScore <= 17 && self.playerTurn === true) { return true; }
    return false;
  };

  self.startRound = function(amount) {
    self.clearPreviousRound();
    self.playerTurn = true;
    self.bet(amount);
    self.dealerHit();
    self.hit();
    self.hit();
    if (self.onePlayerGame === false) {
      self.computerPlayerHit();
      self.computerPlayerHit();
    }
  };

  self.clearPreviousRound = function() {
    self.dealerTurn = false;
    self.blackjackResult = null;
    player.clearRound();
    computer.clearRound();
    dealer.clearRound();
    self.result = null;
  };

  self.bet = function(amount) {
    player.bet(amount);
    self.playerBalance = '£' + player.balance;
  };

  self.computerPlayerTurn = function() {
    var cards = computer.currentCards[computer.handIndex];
    var total = game.pointsTotal(cards);
    if (total == 'Bust') { return self.computerPlayerStand(); }
    var move = self.computerDecidesMove();
    console.log(move);
    if (move === 'Hit') {
      self.computerPlayerHit();
    } else if (move === 'Double Down') {
      return self.computerPlayerDoubleDown();
    } else if (move === 'Split') {
      self.computerPlayerSplit();
    } else if (move === 'Split then Double Down') {
      self.computerPlayerSplit();
      self.computerPlayerDoubleDown();
    } else if (move === 'Stand') {
      return self.computerPlayerStand();
    }
    self.computerPlayerTurn();

  };

  self.computerPlayerStand = function() {
    self.dealersTurn();
  };

  self.computerPlayerHit = function() {
    var card = computer.getCard(game);
    self.computerCards = computer.currentCards;
  };

  self.computerPlayerDoubleDown = function() {
    computer.doubleDown(game);
    self.computerCards = computer.currentCards;
    self.computerPlayerStand();
  };

  self.computerPlayerSplit = function() {
    self.computerCards = computer.split();
  };

  self.computerDecidesMove = function() {
    self.calculateScore(dealer);
    var cards = self.computerCards[computer.handIndex];
    return hint.giveHint(cards, self.dealerScore, game);
  };

  self.dealerHit = function() {
    var card = dealer.getCard(game);
    self.dealerCards = dealer.currentCards;
    self.calculateScore(dealer);
    self.cardCounting(card);
  };

  self.dealersTurn = function() {
    self.dealerTurn = true;
    while (self.dealerScore < 17) { self.dealerHit(); }
    self.determineWinner();
  };

  self.hit = function() {
    self.displayHint = null;
    var card = player.getCard(game);
    self.playerCards = player.currentCards;
    self.calculateScore(player);
    self.cardCounting(card);
    if (self.playerScore == 'Bust' || self.playerScore === 21) { self.stand(); }
  };

  self.stand = function() {
    // next player turn
    self.displayHint = null;
    var result = player.stand(game);
    self.calculateScore(player);
    if (result === 'done') {
      self.playerTurn = false;
      if (self.onePlayerGame === false) {
        self.computerPlayerTurn();
      } else {
        self.dealersTurn();
      }
    }
  };

  self.doubleDown = function() {
    self.displayHint = null;
    player.doubleDown(game);
    self.playerCards = player.currentCards;
    self.calculateScore(player);
    self.playerBalance = '£' + player.balance;
    self.stand();
  };

  self.split = function() {
    self.displayHint = null;
    self.playerCards = player.split();
    self.playerBalance = '£' + player.balance;
  };

  self.calculateScore = function(user) {
    var cards = user.currentCards[user.handIndex];
    var total = game.pointsTotal(cards);
    if (user === player) {
      self.playerScore = total;
    } else if (user === dealer) {
      self.dealerScore = total;
    }
    if (total === 21 && user.currentCards[user.handIndex].length === 2) {
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
    for (var x in player.currentCards) {
      var total = game.pointsTotal(player.currentCards[x]);
      if ( self.dealerScore === total) { self.isADraw(); }
      else if (total > self.dealerScore ||
        (self.dealerScore === 'Bust' && total != 'Bust')) {
          self.playerWins();
        }
      else { self.result = 'You lose'; }
    }
    self.saveBalance();
    self.shuffleShoe();
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

  self.giveHint = function() {
    self.calculateScore(dealer);
    var cards = self.playerCards[player.handIndex];
    self.displayHint = hint.giveHint(cards, self.dealerScore, game);
  };

}]);