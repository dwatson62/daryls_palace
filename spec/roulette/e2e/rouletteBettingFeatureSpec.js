var amountBet = element(by.id('amount-bet'));
var betBtn = element(by.id('£1bet-btn'));
var clearBtn = element(by.id('clear-btn'));
var columnBtn = element(by.className('column-btn'));
var dozenBtn = element(by.className('doz-btn'));
var numberBtn = element(by.className('blacknumber-btn'));
var oddBtn = element(by.id('odd-btn'));
var oneTo18Btn = element(by.id('1to18-btn'));
var pastSpins = element.all(by.repeater('pastSpins in rltCtrl.pastSpins'));
var playerBalance = element(by.id('player-balance'));
var playerBet = element.all(by.repeater('bets in rltCtrl.bet'));
var redBtn = element(by.id('red-btn'));

beforeEach(function(){
  browser.get('http://localhost:3000/roulette');
});

describe('Betting', function() {

  beforeEach(function () {
    betBtn.click();
  });

  it('Can bet on a number (6)', function() {
    numberBtn.click();
    expect(playerBet.getText()).toContain('£1 on 6');
  });

  it('Can bet on a colour', function() {
    redBtn.click();
    expect(playerBet.getText()).toContain('£1 on Red');
  });

  it('Can bet on odd/even', function() {
    oddBtn.click();
    expect(playerBet.getText()).toContain('£1 on Odd');
  });

  it('Can bet on a column (3)', function() {
    columnBtn.click();
    expect(playerBet.getText()).toContain('£1 on Column 3');
  });

  it('Can bet on a dozen (1)', function() {
    dozenBtn.click();
    expect(playerBet.getText()).toContain('£1 on Dozen 1');
  });

  it('Can bet on a 1-18', function() {
    oneTo18Btn.click();
    expect(playerBet.getText()).toContain('£1 on 1 - 18');
  });

  it('displays the total bet on each round', function() {
    betBtn.click();
    oddBtn.click();
    numberBtn.click();
    columnBtn.click();
    expect(amountBet.getText()).toEqual('Total bet: £3');
  });

  it('can clear current bets', function() {
    betBtn.click();
    numberBtn.click();
    clearBtn.click();
    expect(playerBet.getText()).toEqual([]);
    expect(amountBet.getText()).toEqual('Total bet: £0');
  });

});

describe('Player balance', function() {

  it('is deducted for each bet', function() {
    betBtn.click();
    numberBtn.click();
    expect(playerBalance.getText()).toEqual('Your balance: £99');
  });

});

describe('Player cannot', function() {

  it('Confirm a bet until money has been put down', function() {
    expect(numberBtn.isEnabled()).toBe(false);
    expect(redBtn.isEnabled()).toBe(false);
    expect(oddBtn.isEnabled()).toBe(false);
    expect(columnBtn.isEnabled()).toBe(false);
  });

  xit('Bet more money than they have', function() {
    expect(betBtn.isEnabled()).toBe(false);
  });

});