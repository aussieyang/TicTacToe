console.log("testing");

//Handles on reactive page elements
var $board = $("#game");

//How many wins
var p1Win = 0;
var p2Win = 0;

//Turn toggle
var currentPlayer = "p1";

//Store names
var nameArray = [];

//Total tally to calculate winner via 9bit
var p1Total = 0;
var p2Total = 0;

//Keeping track of selected boxes and winning numbers to parse through to chekc for winner
var boardData = [];
var winner = [7,56,73,84,146,273,292,448];

//Player markers
var player1 = "tictac.png";
var player2 = "toes.png";

//ID numerical values defined
var idNumber = function(id) {
  return ($(id).attr("id").split("-")[1]);
}

//Gets index value of boardData
var boardDataIndex = function(value) {
  return boardData.indexOf(value);
}

//Pic selector
var picSelect = function() {
  $("#poison").on("click", ".pic", function() {
    if($(this).attr("id")==="tictac"){
      player1 = "tictac.png";
      player2 = "toes.png";
      $("#poison > div").css({"border-style":"none"});
      $(this).css({"border-style":"dotted", "border-color":"red"});
    } else if($(this).attr("id")==="toes") {
      player1 = "toes.png";
      player2 = "tictac.png";
      $("#poison > div").css({"border-style":"none"});
      $(this).css({"border-style":"dotted", "border-color":"red"});
    } else if($(this).attr("id")==="cross") {
      player1 = "cross.png";
      player2 = "nought.png";
      $("#poison > div").css({"border-style":"none"});
      $(this).css({"border-style":"dotted", "border-color":"red"});
    } else if($(this).attr("id")==="nought") {
      player1 = "nought.png";
      player2 = "cross.png";
      $("#poison > div").css({"border-style":"none"});
      $(this).css({"border-style":"dotted", "border-color":"red"});
    }
  })
}
picSelect();

//Create gameboard for new game
var newGame = function() {
  //Resetting all values
  $board.empty();
  boardData = [];
  p1Total = 0;
  p2Total = 0;
  //Draws the board and gives ids
  for(name = 0; name < 9; name++){
    var divs = $("<div> </div>").attr("id", "n-" + Math.pow(2, name)).attr("class", "box " + name);
    $board.append(divs);
    //Populates boardData with id numbers
    boardData.push(idNumber(divs));
  }
}


//Test for winning score
var p1Winner = function() {
  for(var i = 0; i < winner.length; i++) {
    if((winner[i] & p1Total) === winner[i]) {
      return true;
    }
  } return false;
}

var p2Winner = function() {
  for(var i = 0; i < winner.length; i++) {
    if((winner[i] & p2Total) === winner[i]) {
      return true;
    }
  } return false;
}

//Click on start game behaviour
$("#startbtn").on("click", function() {
  newGame();
  //Name input saved in array
  nameArray.push($("#p1").val());
  nameArray.push($("#p2").val());
  $("#whosturn").append(nameArray[0]+"'s turn");
  $("#firstframe").css({"display":"none"});
})

//Click on play again behaviour
$("#playagainbtn").on("click", function() {
  newGame();
})


//Win game page behaviour
var p1WinGame = function() {
  $("#showWinner").empty();
  $("#winTally").empty();
  $("#showWinner").append(nameArray[0] + " has won!");
  $("#winTally").append(nameArray[0] + " has " + (p1Win+1) + " wins. <br>" + nameArray[1] + " has " + p2Win + " wins.")
  //Win count
  p1Win++;
  $("#playagain").css({"visibility":"visible"});
}

var p2WinGame = function() {
  $("#showWinner").empty();
  $("#winTally").empty();
  $("#showWinner").append(nameArray[1] + " has won!");
  $("#winTally").append(nameArray[0] + " has " + p1Win + " wins. <br>" + nameArray[1] + " has " + (p2Win+1) + " wins.")
  //Win count
  p2Win++;
  $("#playagain").css({"visibility":"visible"});
}

var drawGame = function () {
  $("#showWinner").empty();
  $("#showWinner").append("The game was a draw!");
  $("#playagain").css({"visibility":"visible"});
}

//Click on box behaviour
var clickResponse = function() {
  $(".gamebox").on("click", ".box", function() {

    var selectedBox = $(this).attr("id");
    var boxValue = selectedBox.split("-")[1];
    var indexBoxValue = boardData.indexOf(boxValue);

    //Stops clickResponse if box occupied by parsing boardData for value
    if (indexBoxValue < 0) {
      return;
    }

    if (currentPlayer === "p1") {
      //Changes boardData value to "player1"
      boardData.splice(indexBoxValue, 1, "player1");
      //Puts img on board
      $(this).empty()
      var image = $("<img>").attr('src', player1)
      $(this).append(image)
      //Totals p1Total
      p1Total = p1Total + parseInt(boxValue);
      //Check for winner
      if (p1Winner()) {
        p1WinGame();//Run win function
      } else if (_.every(boardData, function(item){ //if drawn at end of game
          if(item === "player1" || item === "player2"){
            return true;
          };
      })) {
        drawGame();
      }
      //Toggle player2's turn
      currentPlayer = "p2";
      $("#whosturn").empty()
      $("#whosturn").append(nameArray[1]+"'s turn")
    } else if (currentPlayer === "p2") {
      //Changes boardData value to "player2"
      boardData.splice(indexBoxValue, 1, "player2");
      //Puts img on board
      $(this).empty()
      var image = $("<img>").attr('src', player2)
      $(this).append(image)
      //Totals p2Total
      p2Total = p2Total + parseInt(boxValue);
      //Check for winner
      if (p2Winner()) {
        p2WinGame();//Run win function
      } else if (_.every(boardData, function(item){ //if drawn at end of game
          if(item === "player1" || item === "player2"){
            return true;
          };
      })) {
        drawGame();
      }
      //Toggle player1's turn
      currentPlayer = "p1";
      $("#whosturn").empty()
      $("#whosturn").append(nameArray[0]+"'s turn")
    }
  });
}

clickResponse();

console.log(boardData);
