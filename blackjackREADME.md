Blackjack
=======================

[![Build Status](https://travis-ci.org/dwatson62/blackjack.svg?branch=master)](https://travis-ci.org/dwatson62/blackjack)

![Blackjack](https://github.com/dwatson62/blackjack/blob/master/public/images/screenshot.png)

## Synopsis

Blackjack in Angular. Available on Heroku: [(https://blackjack62.herokuapp.com/)](https://blackjack62.herokuapp.com/)

Currently it is a one player game against the dealer for play money. Player can bet different amounts, hit, stand, double down or split and win extra for a blackjack. Dealer knows to stand on 17 and hit up to 16. The shoe is four decks by default, and it gets shuffled once there is less than 12 cards left. Can also allow for cards not to be removed from the pack, which is useful for testing. To assist the player in beating the dealer, there is a show hint button which tells the player the best move to make based on basic blackjack strategy:

![Blackjack-chart](https://github.com/dwatson62/blackjack/blob/master/public/images/blackjack-chart.gif)

There is an extra computer player playing at the same time. It is a serious player, they follow the above strategy perfectly.

The button "gimme a split" is currently used to build the split functionality, and will be removed when the game is complete. It gives the player a pair of 5's if used on the first hand.

The game still runs quite fast, all cards are dealt instantly. I still need to find a way to slow it down. I've attempted $timeout in Angular and Javascript setTimeout but without much success so far.

Also, if you wish to count cards, just open the console (-1 for <= 7 and +1 for 10's and Aces).

## How to play

Once you are logged in and have opened the blackjack game, it will load in your details and your current balance. In the top left corner are buttons for different bet amounts (£1, £5, £10, £20). Clicking one of these will start the game. Afterwards, the different buttons to play will be here. For the two scores on the left of the screen, the top is the dealer score, and the bottom is your score for your current hand.

