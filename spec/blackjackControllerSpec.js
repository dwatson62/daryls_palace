describe('Blackjack Controller', function() {

  beforeEach(module('blackjack'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('BlackjackController');
  }));

  it('is defined', function() {
    expect(ctrl).toBeDefined();
  });

  it('player can get a card', function() {
    ctrl.hit();
    expect(ctrl.playerCards.length).toEqual(1);
  });

  it('can start a new round', function() {
    ctrl.hit();
    ctrl.nextRound();
    expect(ctrl.playerCards.length).toEqual(0)
  });

});