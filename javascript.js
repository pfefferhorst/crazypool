var stage;
var stageHeight = 600;
var stageWidth = 1000;

var targetPoint = [(stageWidth / 50) - 1, 1];
var startPoint;
var targetPoint;
var answerPoint = [2, 2];

var confirm = document.getElementById("confirm");

var init = function() {
    stage = new createjs.Stage("canvas");

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);

    drawGrid();

    startPoint = generateVector("start");
    collisionPoint = generateVector("collision");

    drawPoint(targetPoint[0], targetPoint[1], "target");
    drawPoint(startPoint[0], startPoint[1], "point");
    drawPoint(collisionPoint[0], collisionPoint[1], "point");
    drawVector("initial");

    var circle = new createjs.Shape();
    circle.graphics.beginFill("lightgrey").drawCircle(0, 0, 10);

    var dragger = new createjs.Container();
    dragger.x = dragger.y = 100;
    dragger.addChild(circle);
    stage.addChild(dragger);

    dragger.on("pressmove",function(evt) {
        // currentTarget will be the container that the event listener was added to:
        dragger.x = Math.round(evt.stageX/50)*50;
        dragger.y = Math.round(evt.stageY/50)*50;

        answerPoint = [dragger.x / 50, dragger.y / 50];
    });
}

confirm.addEventListener("click", function() {
  initVector = subtractVector(collisionPoint, startPoint);
  answerVector = subtractVector(collisionPoint, answerPoint);
  correctVector = subtractVector(targetPoint, collisionPoint);
  console.log(initVector + " : " + answerVector  + " : " + correctVector);

  if(compareVector(addVector(initVector, answerVector), correctVector)) {
    alert("SIEG");
  } else {
    alert("NIEDERLAGE");
  }
});

// a und b sind ARRAYS mit den VEKTOREN drin
var addVector = function(a, b) {
  var x = a[0] + b[0];
  var y = a[1] + b[1];
  return [x,y];
}

var subtractVector = function(a, b) {
  var x = a[0] - b[0];
  var y = a[1] - b[1];
  return [x,y];
}

var compareVector = function(a, b) {
  return (a[0] == b[0] && a[1] == b[1]);
}

var drawGrid = function() {
  var grid = new createjs.Container();
  stage.addChild(grid);

  for(var i = 0; i <= stageWidth; i = i + 50) {
    var line = new createjs.Shape();
    stage.addChild(line);
    line.graphics.setStrokeStyle(1).beginStroke("#BBB");
    line.graphics.moveTo(i, 0);
    line.graphics.lineTo(i, stageHeight);
    line.graphics.endStroke();
  }

  for(var i = 0; i <= stageHeight; i = i + 50) {
    var line = new createjs.Shape();
    stage.addChild(line);
    line.graphics.setStrokeStyle(1).beginStroke("#BBB");
    line.graphics.moveTo(0, i);
    line.graphics.lineTo(stageWidth, i);
    line.graphics.endStroke();
  }
}

var drawPoint = function(x, y, type) {
  var point = new createjs.Shape();
  var color;
  if(type == "target") {
    color = "red";
    size = 20
  } else {
    color = "black";
    size = 10;
  }
  point.graphics.setStrokeStyle(1).beginFill(color).drawCircle(0, 0, size);
  point.x = x * 50;
  point.y = y * 50;

  stage.addChild(point);
}

var drawVector = function(p1, p2) {
  var line = new createjs.Shape();
}

var generateVector = function(type) {

  var minX, maxX, minY, maxY;

  if(type == "start") {
    minX = (stageWidth / 50) / 2;
    maxX = (stageWidth / 50) - 2;

    maxY = 10;
    minY = 7;
  } else if (type == "collision") {
    minX = (stageWidth / 50) / 2;
    maxX = (stageWidth / 50) - 2;

    minY = 2;
    maxY = 6;
  } else {
    console.log("ALARM, FALSCHER PARAMETER, ENTWEDER START ODER COLLISON DU HUNDDDDD");
  }

  startX = getRandomInt(minX, maxX);
  startY = getRandomInt(minY, maxY);

  return [startX, startY];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleTick() {
  stage.update();
}

function BEWEGEN(evt) {
    // currentTarget will be the container that the event listener was added to:
    evt.currentTarget.x = evt.stageX;
    evt.currentTarget.y = evt.stageY;
    // make sure to redraw the stage to show the change:
    stage.update();
};

document.addEventListener("DOMContentLoaded", init);
