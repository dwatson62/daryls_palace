describe('Hint Factory', function() {

  beforeEach(module('blackjack'));

  var hint;

  beforeEach(inject(function(hintFactory, gameFactory) {
    hint = new hintFactory();
    game = new gameFactory();
  }));

  xit('is defined', function() {
    expect(hint).toBeDefined();
  });

  xit('each line has 10 elements', function() {
    for (x in hint.matrix) {
      expect(hint.matrix[x].length).toEqual(10);
    }
  });

  describe('when dealer has 5', function() {

    it('the player is told to hit below an 8', function() {
      var cards = ['D4', 'S3'];
      expect(hint.giveHint(cards, 5, game)).toEqual('Hit');
    });

    it('the player is told to hit on 8', function() {
      var cards = ['D5', 'S3'];
      expect(hint.giveHint(cards, 5, game)).toEqual('Hit');
    });

    it('the player is told to double down on 9', function() {
      var cards = ['D4', 'S5'];
      expect(hint.giveHint(cards, 5, game)).toEqual('Double Down');
    });

    it('the player is told to stand down on 12', function() {
      var cards = ['D4', 'S8'];
      expect(hint.giveHint(cards, 5, game)).toEqual('Stand');
    });

    it('the player is told to double down on A2', function() {
      var cards = ['DA', 'S2'];
      expect(hint.giveHint(cards, 5, game)).toEqual('Double Down');
    });

    it('the player is told to split on 77', function() {
      var cards = ['D7', 'S7'];
      expect(hint.giveHint(cards, 5, game)).toEqual('Split');
    });

  });

});