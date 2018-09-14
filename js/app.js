$(document).ready(function(){


  var interval;
  var timeRunning = false;

  var ball = $("#ball");
  var board = $("#container");

  var xpos = 0;
  var ypos = 0;

  var xdirection = "+";
  var ydirection = "+";

  var xspeed = 0.5;
  var yspeed = 0.5;

  var ballLeft;
  var ballRight;
  var ballTop;
  var ballBott;
  var boardLeft;
  var boardRight;
  var boardTop;
  var boardBott;

  var yacceleration = 0.07;
  var xacceleration = 0.0005;
  var yvelocity = 0;
  var bounce = 2;

  $("#btn").click(ballGame);

  function ballGame(){

    if (timeRunning) {
      clearInterval(interval);
      $("#btn").html("Start");
      timeRunning = !timeRunning;
    }else{
      interval = setInterval(function(){
        // get positions
        ballPosition();
        boardPosition();

        // Moves the ball left and down
        ball.css({
          "left": xpos + "px",
          "top": ypos + "px"
        });

        setHoriziontalDirection();
        setVerticalDirection();

        // boundary collisions - flip ball direction
        horizontalCollisions();
        verticalCollisions();


    }, 1);
      $("#btn").html("Stop");
      timeRunning = !timeRunning;
    };
  };






function ballPosition(){
  // Find the left and top edge of the ball
  ballLeft = ball.offset().left;
  ballTop = ball.offset().top;

  // Find right and bottom edge of the ball
  ballRight = ballLeft + ball.width();
  ballBott = ballTop + ball.height();
}
function boardPosition(){
  // Find the left and top edge of the ball
  boardLeft = board.offset().left;
  boardTop = board.offset().top;

  // Find right and bottom edge of the ball
  boardRight = boardLeft + board.width();
  boardBott = boardTop + board.height();
}

function setHoriziontalDirection(){
  // Adjust position for positive and negative movement
  if (xdirection == "+") {
    xpos+=xspeed;
    if (xspeed > 0.1) {
      xspeed = xspeed-xacceleration;
    }else{
      xspeed = 0;
    }
  }else if (xdirection == "-"){
    xpos-=xspeed;
    if (xspeed > 0.1) {
      xspeed = xspeed-xacceleration;
    }else{
      xspeed = 0;
    }
  }
}
function setVerticalDirection(){
  if (ydirection == "+") {
    yvelocity += yacceleration;
    ypos+=yvelocity;
    // yvelocity = (yacceleration * yspeed)
  }else if (ydirection == "-"){
    yvelocity += yacceleration;
    ypos+=yvelocity;
    // yvelocity = -(yacceleration * yspeed)
  }
}

function horizontalCollisions() {
  // horizontal
  if (ballRight >= boardRight) {
    xdirection = "-"
  }else if(ballLeft <= boardLeft){
    xdirection="+"
  }
}
function verticalCollisions() {
  // vertical
  if (ballBott >= boardBott-1) {
    ydirection = "-";
    if(bounce > 0.1){
      yvelocity = -(3*bounce);
      bounce = bounce - 0.1;
    }else{
      yvelocity = 0;
      yacceleration=0;
    }
  }else if(ballTop <= boardTop){
    ydirection="+"
    yvelocity = 0;
  }
}









});
