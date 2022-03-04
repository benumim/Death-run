var towerImg, tower;
var doorImg,  doorsGroup, soulsGroup;
var climberImg, climbersGroup;
var death, deathImg;
var invisibleBlock1, invisibleBlock2, invisibleBlock3;
var soulImg;
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

    //tower = createSprite(width/2, height/2);
    tower = createSprite(width/2, height/2);
    tower.addImage(towerImg);
    tower.velocityY = 1;
    doorsGroup= new Group();
    climbersGroup= new Group();
    soulsGroup= new Group();
    death = createSprite(width/2, height/2);
    death.addImage(deathImg);
    death.scale = 0.3;

    invisibleBlock1 = createSprite(width/3, height/2,10,height);
    invisibleBlock2 = createSprite(width/3+450, height/2,10,height);
    invisibleBlock3 = createSprite(width/2, height,width, 10);

    gameOver = createSprite(width/2, height/2);
    gameOver.addImage(gameOverImg);
    //novo
    gameOver.visible=false;

    restart = createSprite(gameOver.x, gameOver.y+250);
    restart.addImage(restartImg);
    restart.scale = 0.1;
    //novo
    restart.visible=false;
}



function draw() {
    background(200);
    
  drawSprites();
   
console.log(gameState)
  if (gameState === "play"){
    generateDoors();
    generateSouls();

    if(tower.y > 400){
       tower.y = 300
    }
  
    if(keyDown("space")){
         death.y = death.y  -5;
    }
    
  
    death.visible = true;
  

     death.y = death.y + 3;
  
    if(keyDown("D")){
        death.x = death.x + 4;
    }

    if(keyDown("A")){
      death.x = death.x - 4;
    }

  
    invisibleBlock1.visible = false;
    invisibleBlock2.visible = false;
    invisibleBlock3.visible = false;

    death.collide(invisibleBlock1);
    death.collide(invisibleBlock2);

    gameOver.visible = false;
    restart.visible = false;

    if(death.isTouching(soulsGroup)){
      soulScore = soulScore + 1;
    }
      
    if(death.isTouching(invisibleBlock3)||death.isTouching(doorsGroup)){
      death.visible = false;
      tower.velocityY = 0;
      gameState = "end";
      
    }
  
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

function generateDoors() {

  if(frameCount % 320 === 0){

    var door = createSprite(width/2-random(-100,100),-600);
    door.addImage(doorImg);
    door.velocityY = 5;
    door.lifetime = 700;

    var climber = createSprite(door.x, door.y + 50);
    climber.addImage(climberImg);
    climber.velocityY = door.velocityY;
    climber.lifetime = 700;

    death.depth = door.depth;
    death.depth = death.depth + 1;

    doorsGroup.add(door);
    climbersGroup.add(climber);
        

}
}

function generateSouls() {

  if(frameCount % 160 === 0)
  {
    var soul = createSprite(width/2-random(-50,50),-600);
    soul.addImage(soulImg);
    //alterado escala
    soul.scale = 0.05;
    soul.velocityY = 5;
    soul.lifetime = 700;
    soulsGroup.add(soul);
  }

}