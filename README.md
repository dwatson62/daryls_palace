Blackjack
=======================

[![Build Status](https://travis-ci.org/dwatson62/blackjack.svg?branch=master)](https://travis-ci.org/dwatson62/blackjack)

![Blackjack](https://github.com/dwatson62/blackjack/blob/master/public/images/blackjack.png)

## Synopsis

Blackjack in Angular.

Currently it is a one player game against the dealer for play money. Player can bet different amounts, hit, stand, double down or split and win extra for a blackjack. Dealer knows to stand on 17 and hit up to 16. The shoe is four decks by default, and it gets shuffled once there is less than 12 cards left. Can also allow for cards not to be removed from the pack, which is useful for testing. To assist the player in beating the dealer, there is a show hint button which tells the player the best move to make based on basic blackjack strategy:

![Blackjack-chart](https://github.com/dwatson62/blackjack/blob/master/public/images/blackjack-chart.gif)

Also, if you wish to count cards, just open the console (-1 for <= 7 and +1 for 10's and Aces).

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

- [ ] More styling
- [ ] End the game at £0
- [ ] Add test coverage
