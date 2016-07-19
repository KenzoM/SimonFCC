$(document).ready(function(){
  var game = new Game();
  var board = new Board();

  var audioButtons = {
    "green" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    "red" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    "blue" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    "yellow" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
  }

  Board.prototype.initialize = function (level) {
    board = new Board(level)
  };

  Board.prototype.makeNoise = function(color){
    audioButtons[color].play();
  }

  function Board(gameLevel){
    this.sequence = [];
    this.level = gameLevel || "";
    this.index = 0;
  }
  //lets initilize the game first as default in the following:
  function Game(level){
    this.on = false;
    this.level = level || "easy";
    this.start = false;
    this.score = 18;
    this.over = false;
    this.restart = false;
  }

  //If the game is off, it will default game.on and game.start to false
  $("#on-off-slider").click(function(){
    $(this).toggleClass("on")
    if($("#on-off-slider").hasClass("on")){
      game.on = true;
    } else{
      console.log("game is turned off")
      game.on = false;
      game.start = false;
      game.score = 0;
      $(".button").unbind("click")
      $(".status h2").text("--")
    }
  })

  //selects the level either easy(default) or strict
  $("#level-slider").click(function(){
    $(this).toggleClass("strict")
    if($("#level-slider").hasClass("strict")){
      game.level = "strict";
    } else{
      game.level = "easy";
    }
  })

  //if the button is pressed and the game is on, it will (re)start the game
  $(".btn-round").click(function(){
    if($("#on-off-slider").hasClass("on")){
      if(game.start === true){
        console.log("restart the game")
        game.restart = true;
        game.newGame("Restarting the Game!")
        game.score = 0;
      } else{
        console.log("this is the first game")
        game.newGame("Game Start!")
      }
      game.start = true;
    } else{
      game.start = false;
    }
  })

  Game.prototype.newGame = function(status){
    game.restart = false;
    board.updateStatus(status)
    board.initialize(game.level);
    board.randomSequence();
    setTimeout(function() {
      game.play()
    }, 2500);
  }

  Board.prototype.updateStatus = function(status){
    $(".status h2").text(status);
    setTimeout(function() {
      $(".status h2").fadeOut(500, function() {
          $(this).text("Score: 0");
          $(this).fadeIn(500);
          });
      }, 1000);
  }

  Game.prototype.play = function(){
    board.turnOffUserInput(); //turns off user's input
    board.animateDisplay(); //animate the sequence on the board
    console.log(board)
    board.getUserInput(); //turns on user's input
  }

  Board.prototype.turnOffUserInput = function(){
    $(".button").unbind("click");
  }

  Board.prototype.getUserInput = function(){
    //extra caution: if user press input then
    //turn off the game immediately
    if (game.on === false){return }
    var currentLevel = board.sequence.slice(0,board.index);
    console.log(currentLevel)
    var turn = 0;
    $(".button").click(function(){
      var color = $(this).attr('id');
      board.makeNoise(color);
      if(currentLevel[turn] === color){
        turn += 1;
      } else{
        console.log(board)
        alert("wrong!");
        //resets the game depending on level
      }
      if(turn === board.index){
        game.score += 1 ;
        if (game.score === 20){
          $(".status h2").text("You Win! Try Again?");
          board.turnOffUserInput()
          game.over = true;
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
    //extra caution: if user press input then
    //turn off the game immediately
    if (game.on === false || game.restart === true){return }
    function animatePattern(condition){
      //exit if generatedPattern is zero
      //otherwise, let's light up
      if (generatedPattern.length === 0){
        return
      }
      $("#" + generatedPattern[0]).toggleClass("animate");

      if(condition){
        board.makeNoise(generatedPattern[0])
        setTimeout(function(){
          animatePattern(false)
        },1000)
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
  }
})
