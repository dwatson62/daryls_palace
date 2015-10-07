exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    // 'welcome/e2e/*.js',
    'blackjack/e2e/*.js',
    // 'roulette/e2e/*.js'
  ],

  capabilites: {
    browserName: 'chrome'
  },

  onPrepare: function() {
    browser.driver.get('http://localhost:3000/');
    browser.driver.findElement(by.id('username-login')).sendKeys('bob');
    browser.driver.findElement(by.id('password-login')).sendKeys('123');
    browser.driver.findElement(by.id('submit-login')).click();
    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl();
    }, 10000);
  }
};