describe('Blackjack Controller', function() {

  beforeEach(module('blackjack'));

  var ctrl;

  beforeEach(inject(function($controller, gameFactory) {
    ctrl = $controller('BlackjackController');
  }));

  describe('Basic moves', function() {

    beforeEach(function() {
      spyOn(ctrl.game, 'dealOne').and.returnValue('D6');
      ctrl.startRound(10);
    });

    it('is defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('player starts with 1 hand', function() {
      expect(ctrl.playerCards.length).toEqual(1);
    });

    it('player starts with two cards', function() {
      expect(ctrl.playerCards[0].length).toEqual(2);
    });

    it('player can hit', function() {
      ctrl.hit(0);
      expect(ctrl.result).toBeDefined();
    });

    it('player can stand, to find out the result', function() {
      ctrl.stand(0);
      expect(ctrl.result).toBeDefined();
    });

    it('player can double down and get just 1 more card', function() {
      ctrl.doubleDown();
      expect(ctrl.playerCards[0].length).toEqual(3);
    });

    it('can start a new round', function() {
      ctrl.stand(0);
      ctrl.startRound(10);
      expect(ctrl.playerCards[0].length).toEqual(2);
    });

  });

  describe('Winning and losing', function() {

    beforeEach(function() {
      ctrl.toggleShuffleDeck();
    });

    it('player can lose their bet with a lower score than the dealer', function() {
      spyOn(ctrl.game, 'dealOne').and.returnValue('D5');
      ctrl.startRound(10);
      ctrl.hit(0);
      ctrl.stand(0);
      // player stands on 15. Dealer will hit on 15 and finish with 20
      expect(ctrl.playerBalance).toEqual('£90')
      expect(ctrl.result).toEqual('You lose')
    });

    it('player can draw and get their stake back', function() {
      spyOn(ctrl.game, 'dealOne').and.returnValue('D6');
      ctrl.startRound(10);
      ctrl.hit(0);
      ctrl.stand(0);
      expect(ctrl.playerBalance).toEqual('£100');
      expect(ctrl.result).toEqual('Draw');
    });

    it('player can win and double their stake', function() {
      var cards = ['D6', 'D8', 'D10', 'D5', 'D6']
      spyOn(ctrl.game, 'dealOne').and.callFake(function() {
        return cards.splice(0, 1).join();
      });
      ctrl.startRound(10);
      ctrl.stand(0);
      // dealer stands on 17
      // player stands on 18
      expect(ctrl.result).toEqual('Player wins £20');
      expect(ctrl.playerBalance).toEqual('£110');
    });

    it('player can double down and win 4x original stake', function() {
      var cards = ['D6', 'D8', 'D5', 'D5', 'D5', 'D6']
      spyOn(ctrl.game, 'dealOne').and.callFake(function() {
        return cards.splice(0, 1).join();
      });
      ctrl.startRound(10);
      ctrl.doubleDown(0);
      // dealer stands on 17
      // player double downs on 13 and stands on 18
      expect(ctrl.result).toEqual('Player wins £40');
      expect(ctrl.playerBalance).toEqual('£120');
    });


  });

  describe('Splitting', function() {

    beforeEach(function() {
      // D6
      spyOn(ctrl.game, 'dealOne').and.returnValue('D6');
      ctrl.toggleShuffleDeck();
      ctrl.startRound(10);
    });

    it('player can split their cards when given duplicates', function() {
      ctrl.split();
      expect(ctrl.playerCards.length).toEqual(2);
    });

    it('player doubles bet on a split', function() {
      ctrl.split();
      expect(ctrl.playerBalance).toEqual('£80');
    });

    it('player automatically gets an extra card on first split card', function() {
      ctrl.split();
      expect(ctrl.playerCards[0].length).toEqual(2);
    });

    it('player can hit on first split card', function() {
      ctrl.split();
      ctrl.hit(0);
      expect(ctrl.playerCards).toEqual([['D6', 'D6', 'D6'],['D6']]);
    });

    it('player can stand on first split card, and automatically hits on second split card', function() {
      ctrl.split();
      ctrl.stand(0);
      expect(ctrl.playerCards).toEqual([['D6', 'D6'],['D6', 'D6']]);
    });

  });

  describe('Winning and losing split bets', function() {

    setup = function(cards) {
      // Rigs a pack of cards to deal in a particular order
      spyOn(ctrl.game, 'dealOne').and.callFake(function() {
        return cards.splice(0, 1).join();
      });
      // Begins the round, player bets £10
      ctrl.startRound(10);
    };

    it('player can win on all split bets', function() {
      var cards = ['D7', 'D6', 'D6', 'S8', 'H6', 'D10', 'D4', 'D5', 'H5']
      setup(cards);
      ctrl.split();
      ctrl.hit(0);
      ctrl.stand(0);
      ctrl.hit(1);
      ctrl.stand(1);
      // Dealer gets 17
      // Player gets 21 and 21
      expect(ctrl.playerBalance).toEqual('£120');
    });

    it('player can lose on all split bets', function() {
      var cards = ['D7', 'D6', 'D6', 'S10', 'D10', 'D5', 'D5', 'H5']
      setup(cards);
      ctrl.split();
      ctrl.stand(0);
      ctrl.stand(1);
      // Dealer gets 17
      // Player gets 16 and 16
      expect(ctrl.playerBalance).toEqual('£80');
      expect(ctrl.result).toEqual('You lose');
    });

    it('player wins on first split and loses on second', function() {
      var cards = ['D7', 'D6', 'D6', 'H3', 'D10', 'S10', 'D5', 'D5', 'H5']
      setup(cards);
      ctrl.split();
      ctrl.hit(0)
      ctrl.stand(0);
      ctrl.stand(1);
      // Dealer gets 17
      // Player gets 19 and 16
      expect(ctrl.playerBalance).toEqual('£100');
    });

    it('player loses on first split and wins on second', function() {
      var cards = ['D7', 'D6', 'D6', 'S10', 'H3', 'D10', 'D5', 'D5', 'H5']
      setup(cards);
      ctrl.split();
      ctrl.stand(0);
      ctrl.hit(1)
      ctrl.stand(1);
      // Dealer gets 17
      // Player gets 16 and 19
      expect(ctrl.playerBalance).toEqual('£100');
    });

    it('player can draw with dealer on all split bets', function() {
      var cards = ['D7', 'D6', 'D6', 'S5', 'C6', 'H6', 'D5', 'D5', 'H5']
      setup(cards);
      ctrl.split();
      ctrl.hit(0);
      ctrl.stand(0);
      ctrl.hit(1);
      ctrl.stand(1);
      // Dealer gets 17
      // Player gets 17 and 17
      expect(ctrl.playerBalance).toEqual('£100');
      expect(ctrl.result).toEqual('Draw');
    });

  });

});
