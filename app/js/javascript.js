$(document).ready(function(){
  var game = new Game();
  var board = new Board();

  Board.prototype.initialize = function (level) {
    board = new Board(level)
  };

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
    this.score = 0;
    this.over = false;
    // this.restart = false;
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
      game.restart = false;
      $(".button").unbind("click")
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
        game.newGame("Restarting the Game!")
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
    board.getUserInput(); //turns on user's input
  }

  Board.prototype.turnOffUserInput = function(){
    $(".button").unbind("click");
  }

  Board.prototype.getUserInput = function(){
    var currentLevel = board.sequence.slice(0,board.index);
    var turn = 0;
    $(".button").click(function(){
      var color = $(this).attr('id');
      if(currentLevel[turn] === color){
        console.log("correct")
        turn += 1;
      } else{
        alert("wrong!");
        //resets the game depending on level
      }
      if(turn === board.index){
        console.log("next round")
        game.play()
      }
    })
  }

  //lets simply collect all 20 random sequence in the beginning
  Board.prototype.randomSequence = function(){
    console.log("Simon call 20 random sequence");
    var arrColors = ["green","blue","red","yellow"];
    while(board.sequence.length < 20){
      var newSeq = arrColors[Math.floor(Math.random() * arrColors.length)];
      board.sequence.push(newSeq);
    }
  };

  //animateDisplay simply animates the board
  Board.prototype.animateDisplay = function(){
    function animatePattern(condition){
      //exit if generatedPattern is zero
      //otherwise, let's light up
      if (generatedPattern.length === 0){
        return
      }
      $("#" + generatedPattern[0]).toggleClass("animate")
      if(condition){
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
    board.index += 1;
  }
})
