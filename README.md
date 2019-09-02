# Memory card game

This is a memory cars game built to test memory and to have some fun. The deck of consists of 8 matching card pairs.  

## Getting Started

Just click this link #### and enjoy the game

## Instructions

* Click on any two cards to turn them over
* Remember what was on each card and where it was.
* If two cards are matched they will turned over
* The game is over when all the cards have been matched.

## How I built the Game

I builed this game using JavaScript, and taking advantage of JavaScript ability to access and manipulate the DOM.

* A card deck is build and shuffled every time the game start
* Every 2 cards that are open are checked for a match, if the cards are matched they stay open, if not they are closed.
* Every time 2 cards are open the movescount grow by one.
* When a player take 16 or more moves to finish they will lose 1 star, if it takes the player 32 or more moves they will lose 2 stars.
* The program check when all cards are matched by checking if all cards have the match class to them, if so the game is over and the player will see a pop up with all their statistics

## Authors

* **Libi Libman** - *Initial work* - [Libi-Libman](https://github.com/Libi-Libman)
