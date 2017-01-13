# FCC Simon Game
A simple simon-says game using JavaScript/jQuery.

## Getting Started

[Live Demo](http://kenzomendoza.com/SimonFCC/app/)

The app is based on one of [FreeCodeCamp's challenges](https://www.freecodecamp.com/challenges/build-a-simon-game).

It meets the following criteria:

>User Story: I am presented with a random series of button presses.

>User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

>User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

>User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.

>User Story: I can see how many steps are in the current series of button presses.

>User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.

>User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

>User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

### Prerequisites

This app  utilizes the following:
- `jQuery` for DOM manipulation
- `Gulp.js`  is for task/build runner, including compiling sass files.

In addition, the opponent AI is built based [min-max algorithm](https://en.wikipedia.org/wiki/Minimax). In other words, _you cannot ever win the game (only tie or lose to the opponent)_.

If you are able to win, send me a message and you win a prize!


### Installing

1. Clone the repository
2. `npm install`
3. In your terminal, type `gulp watch`
4. Go to `localhost:3000`
5. Have fun!

## Built With

* [Gulp.js](https://github.com/gulpjs/gulp) - Workflow/development
* [jQuery](https://github.com/jquery/jquery) - DOM manipulation

## Authors

* **Kenzo Mendoza** - *Initial work* - [Neotriz](https://github.com/neotriz)
