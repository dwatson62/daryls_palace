blackjackGame.factory('hintFactory', function() {

  var Hint = function() {
    this.createMatrix();
  };

  Hint.prototype.createMatrix = function() {
    this.matrix = [];
    this.lineOne();
    this.lineThree();
    this.lineFour();
    this.lineFive();
    this.lineSixAndSeven();
    this.lineEight();
    this.lineNine();
  };

  Hint.prototype.lineOne = function() {
    var line = []
    this.createLoop(10, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTwo = function() {
    var line = ['Hit']
    this.createLoop(4, 'Double Down', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineThree = function() {
    var line = []
    this.createLoop(8, 'Double Down', line);
    this.createLoop(2, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineFour = function() {
    var line = []
    this.createLoop(9, 'Double Down', line);
    line.push('Hit')
    this.matrix.push(line);
  };

  Hint.prototype.lineFive = function() {
    var line = []
    this.createLoop(2, 'Hit', line);
    this.createLoop(3, 'Stand', line);
    this.createLoop(5, 'Hit', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineSixAndSeven = function() {
    for (x = 0; x < 2; x ++) {
      var line = []
      this.createLoop(5, 'Stand', line);
      this.createLoop(5, 'Hit', line);
      this.matrix.push(line);
    }
  };

  Hint.prototype.lineEight = function() {
    var line = []
    this.createLoop(5, 'Stand', line);
    this.createLoop(3, 'Hit', line);
    line.push('Hit/Surrender');
    line.push('Hit');
    this.matrix.push(line);
  };

  Hint.prototype.lineNine = function() {
    var line = []
    this.createLoop(5, 'Stand', line);
    this.createLoop(2, 'Hit', line);
    this.createLoop(3, 'Hit/Surrender', line);
    this.matrix.push(line);
  };

  Hint.prototype.lineTen = function() {
    var line = []
    this.createLoop(10, 'Stand', line);
    this.matrix.push(line);
  };

  Hint.prototype.createLoop = function(size, value, line) {
    for (x = 0; x < size; x ++) { line.push(value) }
  };

  Hint.prototype.giveHint = function(player, dealer) {
    if (2 <= dealer <= 11) {
      if (player === 8) { return 'Hit' }
    }
    if (2 <= dealer <= 10) {
      if (player === 9) { return 'Double Down' }
    }
  };

  return Hint;

});
