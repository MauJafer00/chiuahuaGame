var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var score = 0;
var chihuahua;
var chihuahua_running;
var ground;
var groundImage;
var invisibleGround;
var obstacleImage1, obstacleImage2, obstacleImage3;
var obstaclesGroup;
var obstacle1Image;
var gameoverimg, restartimg;
var gameOver, restart;
var chihuahua_collided;
function preload() {
  
  chihuahua_running = loadAnimation("./assets/chihuahua1.png", "./assets/chihuahua2.png", "./assets/chihuahua3.png");
 // chihuahua_collided=loadAnimation("./assets/")
  groundImage = loadImage("./assets/ground3.png");;
  obstacleImage1 = loadImage("./assets/obstacleImage1.png");
  obstacleImage2 = loadImage("./assets/obstacleImage2.png");
  obstacleImage3 = loadImage("./assets/obstacleImage3.png");
  gameoverimg = loadImage("./assets/gameOver.png");
  restartimg = loadImage("./assets/restart.png");
  chihuahua_collided = loadAnimation("./assets/2.png");
}
function setup() {

  createCanvas(600, 200);
  edges = createEdgeSprites();
  var mensaje = "esto es un mensaje";
 

  ground = createSprite(200,250 , 400, 20);
  ground.x = ground.width/2;
  ground.addImage(groundImage);
  invisibleGround = createSprite(200, 190, 400, 20);
  invisibleGround.visible = false;
  score = 0;

  chihuahua = createSprite(50, 160, 20, 50);
  chihuahua.setCollider('circle', 0, 0, 200);
  chihuahua.scale = 0.1;
  chihuahua.addAnimation("running", chihuahua_running);
  chihuahua.addAnimation("collided", chihuahua_collided);
  obstaclesGroup = new Group();
 
  //creagameOver y restart
  gameover = createSprite(300, 100);
  gameover.scale=0.8
  gameover.addImage(gameoverimg);

  restart = createSprite(300, 140);
  restart.scale = 0.8;
  restart.addImage(restartimg);

  gameover.visible = false;
  restart.visible = false;


}
  
function draw() {
  // console.log(frameCount);
  background("#80d2e0");
  // mostrar la puntuacion
  text("puntuacion"+score,500,50);
  
  console.log("frameRate " + frameRate);
  if (gameState == PLAY) {
    
    score=score+Math.round(frameRate()/60);
    ground.velocityX = -2;

    if (ground.x < 0) {
    
      ground.x = ground.width / 2;
  
    }
    if (keyDown("space") && chihuahua.y >= 159) {
    
      chihuahua.velocityY = -10;
  
    }
    if (score >= 700000) {
      
      obstaclesGroup.setVelocityXEach(-5);
      background("black");

    }
    chihuahua.velocityY = chihuahua.velocityY + 0.5;
    if (obstaclesGroup.isTouching(chihuahua)) {
      chihuahua.changeAnimation ("collided", chihuahua_collided);
      gameState=END;
      obstaclesGroup.setLifetimeEach(-5);
      score = 0;
      gameover.visible = true;
      restart.visible = true;
     }
     spawnObstacles();
  }
  else if(gameState===END){
    // se detiene el suelo 
   
    ground.velocityX = 0;
    chihuahua.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    if (mousePressedOver(restart)) {

      reset();

    }
   // chihuahua.changeAnimation("collided", chihuahua_collided);
  }
 //  console.log(ground.width);
  
 
  chihuahua.collide(invisibleGround);
  
  
 
  drawSprites();

}
function reset() {
  
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  scoreMultiplier = 0.5;
  chihuahua.changeAnimation("running", chihuahua_running);

}
function spawnObstacles() {
           
  if (frameCount % Math.round(random(100,150 )) === 0) {

    var obstacle = createSprite(500, 160, 20, 50);
    obstacle.velocityX = -3 ;
    obstacle.scale = 0.08;
    obstacle.setCollider('circle', 0, 0, 250);
    //obstacle.debug=true 
    obstacle.lifetime = 310;
    
    var rand = Math.round(random(1, 3));

    switch (rand) {

      case 1: obstacle.addImage(obstacleImage1);
        break;
      case 2: obstacle.addImage(obstacleImage2);
        break;
      case 3: obstacle.addImage(obstacleImage3);
        break;

      default: break;

    }

    // esto es para que las imagenes esten al frente y no de fondo ;

    obstacle.depth = chihuahua.depth;
    chihuahua.depth = chihuahua.depth + 1;

    obstacle.depth = restart.depth;
    restart.depth = restart.depth + 1;
    
    //añade cada obstaculo al grupo
    obstaclesGroup.add(obstacle);
  }

}
 