var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var death, deathImg;
var invisibleBlock1, invisibleBlock2, invisibleBlock3;
var soul, soulImg;
var gameOver, gameOverImg;
var restartButton, restartImg;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  deathImg = loadImage("ghost.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  soulImg = loadImage("soul.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(windowWidth/2, windowHeight/2);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  death = createSprite(width/2, windowHeight/2);
  death.addImage("ghost standing", deathImg);
  death.scale = 0.3;
  invisibleBlock1 = createSprite(windowWidth/3, windowHeight/2,10,windowHeight);
  invisibleBlock2 = createSprite(windowWidth/3+450, windowHeight/2,10,windowHeight);
  invisibleBlock3 = createSprite(windowWidth/2, windowHeight,windowWidth, 10);
  gameOver = createSprite(windowWidth/2, windowHeight/2);
  gameOver.addImage(gameOverImg);
  restart = createSprite(gameOver.x, gameOver.y+250);
  restart.addImage(restartImg);
  restart.scale = 0.1;
}

function generateDoors() {
  if(frameCount % 320 === 0){
    door = createSprite(windowWidth/2-random(-100,100),-600);
    door.addImage(doorImg);
    door.velocityY = 5;
    climber = createSprite(door.x, door.y + 50);
    climber.addImage(climberImg);
    climber.velocityY = door.velocityY;
    death.depth = door.depth;
    death.depth = death.depth + 1;
    door.lifetime = 700;
    climber.lifetime = 700;
  }
}

function generateSouls() {
  if(frameCount % 160 === 0){
    soul = createSprite(windowWidth/2-random(-50,50),-600);
    soul.addImage(soulImg);
    soul.scale = 0.2;
    soul.velocityY = 5;
    soul.lifetime = 700;
  }
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
  }

  drawSprites();

if (gameState === "play"){
  if(keyDown("space")){
    death.y = death.y + -5;
  }

  death.visible = true;
 

  death.y = death.y + 3;

  if(keyDown("D")){
    death.x = death.x + 4;
  }

  if(keyDown("A")){
    death.x = death.x - 4;
  }

  generateDoors();
  generateSouls();

  invisibleBlock1.visible = false;
  invisibleBlock2.visible = false;
  invisibleBlock3.visible = false;

  death.collide(invisibleBlock1);
  death.collide(invisibleBlock2);

  gameOver.visible = false;
  restart.visible = false;

  if(death.isTouching(soul)){
    soulScore = soulScore + 1;
  }
}
  
  if(death.isTouching(invisibleBlock3)){
    gameState = "end";
    death.visible = false;
    tower.velocityY = 0;
  }

  if(gameState === "end"){
    gameOver.visible = true;
    restart.visible = true;
     if(mousePressedOver(restart)){
       death.x = windowWidth/2;
       death.y = windowHeight/2;
       tower.velocityY = 1;
       gameState = "play";
     }
  }
}
