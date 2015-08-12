blackjackGame.factory('hintFactory', function() {

  var Hint = function() {
    this.createMatrix();
  };

  Hint.prototype.createMatrix = function() {
    // this creates the matrix as depicted in /images/blackjack-chart.gif
    this.matrix = [];
    this.lineOne();
    this.lineTwo();
    this.lineThree();
    this.lineFour();
    this.lineFive();
    this.lineSixAndSeven();
    this.lineEight();
    this.lineNine();
    this.lineTen();
    this.lineElevenAndTwelve();
    this.lineThirteenAndFourteen();
    this.lineFifteen();
    this.lineSixteen();
    this.lineSeventeenAndEighteen();
    this.lineNineteenAndTwenty();
    this.lineTwentyOne();
    this.lineTwentyTwo();
    this.lineTwentyThree();
    this.lineTwentyFour();
    this.lineTwentyFive();
    this.lineTwentySix();
    this.lineTwentySeven();
    this.lineTwentyEight();
  };

  Hint.prototype.lineOne = function() {
    var line = [];
    this.createLoop(10, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwo = function() {
    var line = ['Hit'];
    this.createLoop(4, 'Double Down', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineThree = function() {
    var line = [];
    this.createLoop(8, 'Double Down', line);
    this.createLoop(2, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineFour = function() {
    var line = [];
    this.createLoop(9, 'Double Down', line);
    line.push('Hit');
    this.matrix.push(line);
  };

  Hint.prototype.lineFive = function() {
    var line = [];
    this.createLoop(2, 'Hit', line);
    this.createLoop(3, 'Stand', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineSixAndSeven = function() {
    var line = [];
    this.createLoop(5, 'Stand', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
    this.matrix.push(line);
  };

  Hint.prototype.lineEight = function() {
    var line = [];
    this.createLoop(5, 'Stand', line);
    this.createLoop(3, 'Hit', line);
    line.push('Hit');
    line.push('Hit');
    this.matrix.push(line);
  };

  Hint.prototype.lineNine = function() {
    var line = [];
    this.createLoop(5, 'Stand', line);
    this.createLoop(2, 'Hit', line);
    this.createLoop(3, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTen = function() {
    var line = [];
    this.createLoop(10, 'Stand', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineElevenAndTwelve = function() {
    var line = [];
    this.createLoop(3, 'Hit', line);
    this.createLoop(2, 'Double Down', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
    this.matrix.push(line);
  };

  Hint.prototype.lineThirteenAndFourteen = function() {
    var line = [];
    this.createLoop(2, 'Hit', line);
    this.createLoop(3, 'Double Down', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
    this.matrix.push(line);
  };

  Hint.prototype.lineFifteen = function() {
    var line = ['Hit'];
    this.createLoop(4, 'Double Down', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineSixteen = function() {
    var line = ['Stand'];
    this.createLoop(4, 'Double Down', line);
    this.createLoop(2, 'Stand', line);
    this.createLoop(3, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineSeventeenAndEighteen = function() {
    var line = [];
    this.createLoop(10, 'Stand', line);
    this.matrix.push(line);
    this.matrix.push(line);
  };

  Hint.prototype.lineNineteenAndTwenty = function() {
    var line = [];
    this.createLoop(2, 'Split then Double Down', line);
    this.createLoop(4, 'Split', line);
    this.createLoop(4, 'Hit', line);
    this.matrix.push(line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentyOne = function() {
    var line = [];
    this.createLoop(3, 'Hit', line);
    this.createLoop(2, 'Split then Double Down', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentyTwo = function() {
    var line = [];
    this.createLoop(8, 'Double Down', line);
    this.createLoop(2, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentyThree = function() {
    var line = ['Split then Double Down'];
    this.createLoop(4, 'Split', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentyFour = function() {
    var line = [];
    this.createLoop(6, 'Split', line);
    this.createLoop(4, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentyFive = function() {
    var line = [];
    this.createLoop(10, 'Split', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentySix = function() {
    var line = [];
    this.createLoop(5, 'Split', line);
    this.createLoop(1, 'Stand', line);
    this.createLoop(2, 'Split', line);
    this.createLoop(2, 'Stand', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentySeven = function() {
    var line = [];
    this.createLoop(10, 'Stand', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwentyEight = function() {
    var line = [];
    this.createLoop(10, 'Split', line);
    this.matrix.push(line);
  };

  Hint.prototype.createLoop = function(size, value, line) {
    for (x = 0; x < size; x ++) { line.push(value); }
  };

  Hint.prototype.giveHint = function(playerCards, dealerScore, game) {
    var playerScore = game.pointsTotal(playerCards);
    if (playerScore < 9) { return 'Hit'; }
    if (playerScore > 17) { return 'Stand'; }
    var y = (dealerScore - 2);
    var x;
    if (this.checkForAces(playerCards, game) === true) {
      x = (playerScore - 3);
    } else if (this.checkForPair(playerCards) === true) {
      x = (game.cardValue(playerCards[0]) + 17);
    } else {
      x = playerScore - 8;
    }
    return this.matrix[x][y];
  };

  Hint.prototype.checkForAces = function(playerCards, game) {
    if (playerCards.length > 2) { return false; }
    for (var x in playerCards) {
      if (game.cardValue(playerCards[x]) === 11) { return true; }
    }
  };

  Hint.prototype.checkForPair = function(playerCards) {
    if (playerCards.length > 2) { return false; }
    if (playerCards[0].substring(1) === playerCards[1].substring(1)) { return true; }
  };

  return Hint;

});
