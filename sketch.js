var player, playerimg, alienimg1, alienimg2, alienimg3, alienimg4, alienimg5;
var backgroundimg, powerupimg1, powerupimg2, blastimg;
var play, end, gameState = play;
var gameoverimg, restartimg;
var score = 0;
var blastsound;


function preload() {
  playerimg = loadImage("Assets/PLAYER1.webp");
  alienimg1 = loadImage("Assets/retroship_21.png");
  alienimg2 = loadImage("Assets/retroship_18.png");
  alienimg3 = loadImage("Assets/retroship_11.png");
  alienimg4 = loadImage("Assets/retroship_09.png");
  alienimg5 = loadImage("Assets/retrocreature_20.png");
  backgroundimg = loadImage("Assets/BKG.jpg");
  powerupimg1 = loadImage("Assets/retro_powerup_coin.png");
  powerupimg2 = loadImage("Assets/retro_powerup_heart.png");
  blastimg = loadImage("Assets/BlastIMG.png");
  gameoverimg = loadImage("Assets/GameOver.jpg");
  restartimg = loadImage("Assets/backward.png");

  blastsound = loadSound("Assets/collided.wav")
}

function setup() {
  createCanvas(1000,600);

  player = createSprite(100, 300);
  player.addImage(playerimg);
  player.scale = 0.3

  blast = createSprite(player.x, player.y);
  blast.addImage(blastimg);
  blast.visible = false;

  gameOver = createSprite(width/2, height/2);
  gameOver.addImage(gameoverimg);
  
  restart = createSprite(500, 400);
  restart.addImage(restartimg);
  
  gameOver.scale = 1;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();
  blastGroup = new Group();

  score = 0
}

function draw() {
  background(backgroundimg);
  spawnObstacles();  

  textSize(40);
  text("Score " + score, 50, 75);

  if(keyDown("UP_ARROW")) {
    player.y -= 6
  }

  if(keyDown("DOWN_ARROW")) {
    player.y += 6
  }

  if(keyDown ("SPACE"))  {
    blast = createSprite(player.x, player.y);
    blast.addImage(blastimg);
    blast.scale = 0.2
    blast.velocityX = 4

    blastGroup.add(blast);
  }
  

    if(blastGroup.overlap(obstaclesGroup, function(collector, collected){
      collector.remove();
      collected.remove();
      score += 5;
      blastsound.play();
    })) 

    if(score % 25 === 0) {
      obstaclesGroup.velocityX -= -1;
    }

     if(obstaclesGroup.isTouching(player)) {
      obstaclesGroup.destroyEach();
     }

   drawSprites();
  }


function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(900);
    
    obstacle.velocityX = -2
    obstacle.y = Math.round(random(50, 550))

    var rand = Math.round(random(1, 5));
    switch(rand) {
      case 1: obstacle.addImage(alienimg1);
              break;
      case 2: obstacle.addImage(alienimg2);
              break;
      case 3: obstacle.addImage(alienimg3);
              break;
      case 4: obstacle.addImage(alienimg4);
              break;
      case 5: obstacle.addImage(alienimg5);
              break;
    }
    obstaclesGroup.add(obstacle);
    obstacle.scale = 0.1;
  }
}

function reset() {
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}