Blackjack
=======================

[![Build Status](https://travis-ci.org/dwatson62/blackjack.svg?branch=master)](https://travis-ci.org/dwatson62/blackjack)

## Synopsis

Blackjack in Angular. Currently it is one player against the dealer. Player can bet different amounts, hit, stand, double down or split and win extra for a blackjack. Dealer knows to stand on 17 and hit up to 16. Currently one deck is used at a time, a card gets removed from the pack when chosen and gets shuffled once there is less than 12 cards left. Can also allow for cards not to be removed from the pack, which is useful for testing.

## Installation

From the command line:

- ``` git clone https://github.com/dwatson62/blackjack ```
- ``` npm start ``` (this will download all npm and bower packages, and launch the server)
- Visit [http://localhost:3000](http://localhost:3000)

#### Tests

For unit tests:

- ``` npm test ```

For feature tests, in separate terminal windows

- ``` npm start ```
- ``` webdriver-manager update ``` then ``` webdriver-manager start ```
- ``` protractor spec/e2e/conf.js ```

## Technologies Used

- Javascript
- Angular
- Express
- Jasmine, Karma

## Job List

- [x] Finish functionality for split bets
- [ ] End the game at £0
- [ ] Add test coverage
