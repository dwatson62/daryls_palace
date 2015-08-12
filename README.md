Daryl's Palace
=======================

[![Build Status](https://travis-ci.org/dwatson62/daryls_palace.svg?branch=master)](https://travis-ci.org/dwatson62/daryls_palace) [![Code Climate](https://codeclimate.com/github/dwatson62/daryls_palace/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/daryls_palace)

## Synopsis

This is a merge between two earlier projects:

[(https://github.com/dwatson62/blackjack)](https://github.com/dwatson62/blackjack)
[(https://github.com/dwatson62/roulette)](https://github.com/dwatson62/roulette)

Daryl's Palace is a casino currently with two games, Blackjack and Roulette. Specific documentation for each game is available at the above links. In the future I would like to add more games to this list.

Users can register and sign in/out. Player balance starts at £100 and can be used across both games. The balance gets updated with every hand/round played.

## Installation

From the command line:

- ``` git clone https://github.com/dwatson62/daryls_palace ```
- ``` npm start ``` (this will download all npm and bower packages, and launch the server)
- Visit [http://localhost:3000](http://localhost:3000)

#### Tests

For unit tests:

- ``` npm test ```

For feature tests, in separate terminal windows

- ``` npm start ```
- ``` webdriver-manager update ``` then ``` webdriver-manager start ```
- ``` protractor spec/blackjack/e2e/conf.js ``` to test Blackjack
- ``` protractor spec/roulette/e2e/conf.js ``` to test Roulette

## Technologies Used

- Javascript
- Angular
- Express
- Jasmine, Karma

## Job List

- [ ] Add test coverage
