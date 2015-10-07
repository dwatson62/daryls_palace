exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'welcome/e2e/*.js'
  ],

  capabilites: {
    browserName: 'chrome'
  },

  onPrepare: function() {
    browser.driver.get('http://localhost:3000/');

    browser.driver.findElement(by.id('username-login')).sendKeys('bob');
    browser.driver.findElement(by.id('password-login')).sendKeys('123');
    browser.driver.findElement(by.id('submit-login')).click();

    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it redirects to
    // index.html.
    // return browser.driver.wait(function() {
    //   console.log('done')
    //   // return browser.driver.getCurrentUrl().then(function(url) {
    //   //   console.log(url);
    //   //   return /index/.test(url);
    //   // });
    // }, 10000);
  }
};