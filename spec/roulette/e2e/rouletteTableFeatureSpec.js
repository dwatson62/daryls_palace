var amountBet = element(by.id('amount-bet'));
var betBtn = element(by.id('£1bet-btn'));
var numberBtn = element(by.className('blacknumber-btn'));
var pastSpins = element.all(by.repeater('pastSpins in rltCtrl.pastSpins'));
var playerBalance = element(by.id('player-balance'));
var playerBet = element.all(by.repeater('bets in rltCtrl.bet'));
var repeatBtn = element(by.id('repeat-btn'));
var message = element(by.id('display-msg'));
var winnings = element(by.id('winnings'));

beforeEach(function(){
  browser.get('http://localhost:3000/roulette');
});

describe('Roulette table', function() {

  it('Has a title', function() {
    expect(browser.getTitle()).toEqual('Roulette');
  });

  it('Displays where the player can bet or not', function() {
    expect(message.getText()).toEqual('Place your bets... 10')
  })

  xit('The wheel spins even without placing a bet', function() {
    pastSpins.then(function(result) {
      expect(result.length).toBeGreaterThan(0);
    });
  });

  it('Displays player balance', function() {
    expect(playerBalance.getText()).toEqual('Your balance: £100');
  });

  xit('Dispays previous spin history', function() {
    betBtn.click();
    numberBtn.click();
    pastSpins.then(function(result) {
      expect(result.length).toBeGreaterThan(0);
    });
  });

  xit('Can repeat the previous bet', function() {
    betBtn.click();
    numberBtn.click();
    repeatBtn.click();
    expect(playerBet.getText()).toContain('£1 on 6');
    expect(amountBet.getText()).toEqual('Total bet: £1');
  });

  it('Displays player winnings', function() {
    expect(winnings.getText()).toContain('Your winnings: £');
  });

});
