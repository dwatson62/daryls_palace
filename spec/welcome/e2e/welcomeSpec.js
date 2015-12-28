describe('login', function() {

  beforeEach(function() {
    browser.driver.get('http://localhost:3000/');
    browser.driver.findElement(by.id('sign-out')).click();
  });

  it('should login', function() {
    browser.driver.findElement(by.id('username-login')).sendKeys('testUser');
    browser.driver.findElement(by.id('password-login')).sendKeys('123');
    browser.driver.findElement(by.id('submit-login')).click();
    var game = browser.driver.findElement(by.id('blackjack-game'));
    expect(game.isDisplayed()).toBeTruthy();
  });
});
