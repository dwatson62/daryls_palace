Daryl's Palace
=======================

[![Build Status](https://travis-ci.org/dwatson62/daryls_palace.svg?branch=master)](https://travis-ci.org/dwatson62/daryls_palace) [![Code Climate](https://codeclimate.com/github/dwatson62/daryls_palace/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/daryls_palace)

## Synopsis

This is a merge between two earlier projects:

[Blackjack](https://github.com/dwatson62/blackjack)
[Roulette](https://github.com/dwatson62/roulette)

Available on Heroku: [Daryl's Palace](https://daryls-palace.herokuapp.com/) although it is rather slow.

Daryl's Palace is a casino currently with the following games:

- Blackjack [README](https://github.com/dwatson62/daryls_palace/blob/master/blackjackREADME.md)
- Roulette [README](https://github.com/dwatson62/daryls_palace/blob/master/rouletteREADME.md)

In the future I would like to add more games to this list. Perhaps pontoon or slot machines. Maybe I'll add in a bar like with PKR.

Users can register and sign in/out. Player balance starts at £100 and can be used across both games. The balance gets updated with every hand/round played. The blackjack game now has a computer playing, who is a serious player and follows basic strategy perfectly.

## Installation

From the command line:

This program requires MongoDB for the database. User data will automatically be stored in the 'darylsPalace' database.

- ``` git clone https://github.com/dwatson62/daryls_palace ```
- ``` npm start ``` (this will download all npm and bower packages, and launch the server)
- Visit [http://localhost:3000](http://localhost:3000)

#### Tests

For unit tests:

- ``` npm test ```

For protractor tests, in separate terminal tabs:

- ``` npm start ```
- ``` webdriver-manager update ``` ``` webdriver-manager start ```
- ``` npm run protractor ```

## Technologies Used

- Node JS
- Angular, jQuery
- Express, MongoDB, Mongoose
- Jasmine, Karma, Protractor, Grunt, Travis CI

## Job List

- [ ] Add test coverage
