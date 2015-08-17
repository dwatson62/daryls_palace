Roulette
=======================

[![Build Status](https://travis-ci.org/dwatson62/roulette.svg?branch=master)](https://travis-ci.org/dwatson62/roulette) [![Code Climate](https://codeclimate.com/github/dwatson62/roulette/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/roulette)

![Roulette](https://github.com/dwatson62/roulette/blob/master/public/images/screenshot.png?raw=true)

## Synopsis

This is my personal project to practice Angular and CSS styling. It is a game replicating European style Roulette using play money.

Currently players can bet multiple amounts on different on different numbers, colours, odd/even, columns, high/low and dozens. Can also view past spins for that particular session, and repeat the previous bet. Angular $interval is being used to spin the wheel every 15 seconds, with no more bets being allowed for the final 5.

Most of the game functionality is in place. It is missing the functionality for some of the inside bets, such as split bets, corner bets, and line bets. Currently not sure how to implement them, other than creating extra cells on the roulette table, meaning the table would require a significant revamp.

At first I used jquery-ui to handle the dragging and dropping of chips. However this made the game rather laggy, and some bets would not always work. I dropped this and moved back to a point and click interface, which works much better.

Types of bets:

![Roulette bets](http://bestroulette.net/wp-content/uploads/2009/12/types-of-roulette-bets.gif)
