$(document).ready(function(){
  var game = new Game();
  var board = new Board();
  //Sources of the sounds for buttons and wrong buzzer
  var audioSource = {
    "green" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    "red" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    "blue" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    "yellow" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    "wrong" : new Audio("http://mp3gfx.com/download/179262796.mp3")
  }
  //Slider is used to turn on/off game
  //When off, the click event listener is off
  $("#on-off-slider").click(function(){
    $(this).toggleClass("on")
    if($("#on-off-slider").hasClass("on")){
      game.on = true;
    } else{
      game.on = false;
      game.start = false;
      game.score = 0;
      $(".button").unbind("click")
      $(".status h2").text("--")
    }
  })
  //Selects the level either easy(default) or strict
  $("#level-slider").click(function(){
    $(this).toggleClass("strict")
    if($("#level-slider").hasClass("strict")){
      game.level = "strict";
    } else{
      game.level = "easy";
    }
  })
  //if the (re)start button is pressed and the game is on
  //it will start or restart the game, based on game.start condition
  $(".btn-round").click(function(){
    if($("#on-off-slider").hasClass("on")){
      if(game.start === true){
        game.restart = true;
        game.newGame("Restarting the Game!");
        game.score = 0;
      } else{
        game.newGame("Game Start!")
      }
      game.start = true;
    } else{
      game.start = false;
    }
  })
  function Board(gameLevel){
    this.sequence = [];
    this.level = gameLevel || "";
    this.index = 0;
  }
  Board.prototype.initialize = function (level) {
    board = new Board(level)
  };
  //calls when the appropiate sound should make
  Board.prototype.makeNoise = function(color){
    audioSource[color].play();
  }
  //updates the game status with fade-in-out effect
  Board.prototype.updateStatus = function(status){
    $(".status h2").text(status);
    setTimeout(function() {
      $(".status h2").fadeOut(500, function() {
          $(this).text("Score: " + game.score);
          $(this).fadeIn(500);
          });
      }, 1000);
  }
  //gets user's input via click listener
  Board.prototype.getUserInput = function(){
    //extra caution: if user press input then
    //turn off the game immediately
    if (game.on === false){return }
    var currentLevel = board.sequence.slice(0,board.index);
    var turn = 0;
    var error = false; //uses during "easy" level -- calls the animateDisplay again
    $(".button").click(function(){
      var color = $(this).attr('id');
      if(currentLevel[turn] === color){
        turn += 1;
        board.makeNoise(color);
      } else{
        if(board.level === "strict"){ //strict level algorithm structure
          board.makeNoise("wrong");
          game.gameOver("You Lose!");
          setTimeout(function(){
            game.newGame("Game Start!")
          }, 2500)
        } else{ //easy level algorithm structure
          board.makeNoise("wrong");
          board.index -= 1;
          error = true;
          board.updateStatus("Try Again!")
          setTimeout(game.play, 3000)
        }
      }
      //if turn reaches the right number of clicks and error is false
      //user wins a round
      if(turn === board.index && error === false){
        game.score += 1 ;
        if (game.score === 20){
          game.gameOver("You Win!")
          return
        }
        var scoreString = "Score: " + game.score;
        $(".status h2").text(scoreString)
        setTimeout(game.play, 1000)
      }
    })
  }
  //lets simply collect all 20 random sequence in the beginning
  Board.prototype.randomSequence = function(){
    var arrColors = ["green","blue","red","yellow"];
    while(board.sequence.length < 20){
      var newSeq = arrColors[Math.floor(Math.random() * arrColors.length)];
      board.sequence.push(newSeq);
    }
  };
  //animateDisplay simply animates the board
  Board.prototype.animateDisplay = function(){
    //extra caution: if user press button then
    //turn off the game immediately
    if (game.on === false || game.restart === true){
      return
    }
    //speed sequence is based on the current game score
    function animatePattern(condition){
      var speed;
      if(game.score < 5){
        speed = 1000
      } else if (game.score >= 5 && game.score <= 10) {
        speed = 500
      } else if (game.score > 11 && game.score <= 15) {
        speed = 300;
      } else{
        speed = 250;
      }
      //exit if generatedPattern is zero
      //otherwise, let's light up
      if (generatedPattern.length === 0 || game.restart === true){
        return
      }
      $("#" + generatedPattern[0]).toggleClass("animate");
      if(condition){
        board.makeNoise(generatedPattern[0])
        setTimeout(function(){
          animatePattern(false)
        },speed)
      } else{
        generatedPattern.splice(0,1);
        setTimeout(function(){
          animatePattern(true)
        },70)
      }
    }
    //generatedPattern takes a slice of the generated sequence from .prototype.randomSequence
    var generatedPattern = board.sequence.slice(0,board.index + 1);
    animatePattern(true) //Here is where we call the function animatePattern
    board.index += 1; //everytime animateDisplay() is called, we'll proceed the next pattern
    game.writing = false;
  }
  //turns off the event listener
  Board.prototype.turnOffUserInput = function(){
    $(".button").unbind("click");
  }
  //lets initilize the game first as default in the following:
  function Game(level){
    this.on = false;
    this.level = level || "easy";
    this.start = false;
    this.score = 0;
    this.over = false;
    this.restart = false;
    this.writing = false;
  }
  //The game mechanics
  Game.prototype.play = function(){
    board.turnOffUserInput(); //turns off user's input
    board.animateDisplay(); //animate the sequence on the board
    board.getUserInput(); //turns on user's input
  }
  //initialize new game and outputs its status
  Game.prototype.newGame = function(status){
    game.restart = false;
    board.updateStatus(status)
    board.initialize(game.level);
    board.randomSequence();
    game.score = 0;
    setTimeout(game.play, 2500);
  }
  Game.prototype.gameOver = function(prompt){
    $(".status h2").text(prompt);
    board.turnOffUserInput()
    game.over = true;
  }
})
