describe('Game Factory', function() {

  beforeEach(module('blackjack'));

  var hint;

  beforeEach(inject(function(hintFactory) {
    hint = new hintFactory();
  }));

  it('is defined', function() {
    console.log(hint.matrix);
    expect(hint).toBeDefined();
  });

  it('each line has 10 elements', function() {
    for (x in hint.matrix) {
      expect(hint.matrix[x].length).toEqual(10);
    }
  });

  describe('when dealer has 5', function() {

    it('the player is told to hit on 8', function() {
      expect(hint.giveHint(8, 5)).toEqual('Hit');
    });

    it('the player is told to double down on 9', function() {
      expect(hint.giveHint(9, 5)).toEqual('Double Down');
    });

  });

});