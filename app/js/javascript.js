$(document).ready(function(){
  var game = new Game();
  var board = new Board();

  Board.prototype.initialize = function (level) {
    board = new Board(level)
  };

  function Board(gameLevel){
    this.sequence = [];
    this.userInput = [];
    this.level = gameLevel || "";
    this.index = 1;
  }
  //lets initilize the game first as default in the following:
  function Game(level){
    this.on = false;
    this.level = level || "easy";
    this.start = false;
    this.score = 0;
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
        game.restart = true;
      } else{
        console.log("this is the first game")
        board.initialize(game.level);
        game.play();
      }
      game.start = true;
    } else{
      game.start = false;
    }
  })


  Game.prototype.play = function(){
    //Event listener on .buttons
    $(".button").click(function(){
      var color = $(this).attr('id');
      console.log(color)
    })

    console.log("Simon call random sequence");
    board.randomSequence();
    board.animateDisplay();

  }

  //lets simply collect all 20 random sequence in the beginning
  Board.prototype.randomSequence = function(){
    var arrColors = ["green","blue","red","yellow"];
    while(board.sequence.length < 20){
      var newSeq = arrColors[Math.floor(Math.random() * arrColors.length)];
      board.sequence.push(newSeq);
    }
  };

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
        },50)
      }
    }
    var generatedPattern = board.sequence.slice(0,board.index);
    console.log(generatedPattern)
    animatePattern(true) //Here is where we call the function animatePattern
    board.index += 1;
  }
})
