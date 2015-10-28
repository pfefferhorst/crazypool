var stage;
var stageHeight = 600;
var stageWidth = 1000;

var targetPoint = [(stageWidth / 50) - 1, 1];
var startPoint;
var targetPoint;

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

}

// a und b sind ARRAYS mit den VEKTOREN drin
var addVector = function(a, b) {
  var x = a[0] + b[0];
  var y = a[1] + b[1];
  return [x,y];
}

var isVectorCorrect = function(vector) {
  return (addVector(collisionPoint, vector)[0] == 0 && addVector(collisionPoint, vector)[1] == 0);
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

document.addEventListener("DOMContentLoaded", init);
