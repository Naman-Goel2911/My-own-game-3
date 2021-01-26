var boy, boyAnimation, boyImage, boyhealth;
var zombie, zombieGroup, zombieAnimation, zombieCount, zombieHealth;
var ghost, ghostGroup, ghostAnimation, ghostCount, ghostHealth;
var islandImage;
var canvas;
var back;
var edges;

//add ghosts,zombies, power potatoes
//feedback as the score            

function preload()
{
  //load animation for the boy, zombie, ghost, island
  boyStanding = loadAnimation("Images/boystanding.png");
  boyWalkingR = loadAnimation("Images/boywalkingr1.png", "Images/boywalkingr2.png", "Images/boywalkingr3.png", "Images/boywalkingr4.png", "Images/boywalkingr5.png", "Images/boywalkingr6.png", "Images/boywalkingr7.png", "Images/boywalkingr8.png");
  boyWalkingL = loadAnimation("Images/boywalkingl1.png", "Images/boywalkingl2.png", "Images/boywalkingl3.png", "Images/boywalkingl4.png", "Images/boywalkingl5.png", "Images/boywalkingl6.png", "Images/boywalkingl7.png", "Images/boywalkingl8.png");

  zombieAnimation = loadAnimation("Images/zombiewalking1.png", "Images/zombiewalking2.png", "Images/zombiewalking3.png", "Images/zombiewalking4.png", "Images/zombiewalking5.png", "Images/zombiewalking6.png", "Images/zombiewalking7.png", "Images/zombiewalking8.png",);

  ghostAnimation = loadAnimation("Images/ghostwalking1.png", "Images/ghostwalking2.png", "Images/ghostwalking3.png", "Images/ghostwalking4.png", "Images/ghostwalking5.png", "Images/ghostwalking6.png", "Images/ghostwalking7.png", "Images/ghostwalking8.png");

  islandImage = loadImage("Images/islandimage.jpg");

  //back = loadImage();
}

function setup() 
{
  //create a boy, give animation appropriately.

  canvas = createCanvas(displayWidth*3, displayHeight*3);

  edges = createEdgeSprites();

  back = createSprite((displayWidth*3)/2, (displayHeight*3)/2, displayWidth*10, displayHeight*10);
  back.scale = 9.5;
  back.addImage(islandImage);
  
  boy = createSprite(displayWidth, displayHeight, 50, 130);
  //boy.x = 0;
  //boy.y = 0;
  boy.addAnimation("boyIsStanding", boyStanding);
  boy.addAnimation("boyIsWalkingL", boyWalkingL);
  boy.addAnimation("boyIsWalkingR", boyWalkingR);

  boy.scale = 0.6
  camera.position.x = boy.x;
  camera.position.y = boy.y;

  zombieGroup = new Group();
  ghostGroup = new Group();

  zombieCount = 0;
  ghostCount = 0;

  zombieHealth = 10;
  ghostHealth = 5;
  boyHealth = 100;
}

function draw() 
{
  background(255);
  drawSprites();
  camera.position.x = boy.x;
  camera.position.y = boy.y;

  //console.log(back.width, back.height);

  if(keyWentDown("w"))
  {
     boy.changeAnimation("boyIsWalkingR", boyWalkingR);
     boy.y = boy.y - 20;
  }

  if(keyWentUp("w"))
  {
     boy.changeAnimation("boyIsStanding", boyStanding);
     boy.y = boy.y - 20;
  }
  if(keyWentDown("s"))
  {
     boy.changeAnimation("boyIsWalkingR", boyWalkingR);
     boy.y = boy.y + 20;
  }
  if(keyWentUp("s"))
  {
     boy.changeAnimation("boyIsStanding", boyStanding);
     boy.y = boy.y + 20;
  }
  if(keyWentDown("a"))
  {
     boy.changeAnimation("boyIsWalkingL", boyWalkingL);
     boy.x = boy.x - 20;
  }
  if(keyWentUp("a"))
  {
     boy.changeAnimation("boyIsStanding", boyStanding);
     boy.x = boy.x - 20;
  }
  if(keyWentDown("d"))
  {
   boy.changeAnimation("boyIsWalkingR", boyWalkingR);
   boy.x = boy.x + 20;
  }
  if(keyWentUp("d"))
  {
     boy.changeAnimation("boyIsStanding", boyStanding);
     boy.x = boy.x + 20;
  }

 
  boy.collide(edges);

  spawnGhost();
  spawnZombie();
}

function spawnZombie()
{
   if(frameCount %100 === 0)
   {
     zombieCount++;
     var randomx = random(boy.x-1000, boy.x+1000);
     var randomy = random(boy.y-500, boy.y+500);
     zombie = createSprite(randomx, randomy, 50, 130);
     //zombie.y = boy.y;
     zombie.velocityX = random(-5, 5);
     zombie.velocityY = random(-5, 5);
     zombie.addAnimation("ZombieIsWalking", zombieAnimation);
     zombie.bounceOff(edges);
     zombie.lifetime = 500;

     zombieGroup.add(zombie);
   }
}

function spawnGhost()
{
  if(frameCount %60 === 0)
   {
     ghostCount++;
     var randomX = random(boy.x-1000, boy.x+1000);
     var randomY = random(boy.y-500, boy.y+500);
     ghost = createSprite(randomX, randomY, 50, 130);
     //ghost.y = boy.y;
     ghost.velocityX = random(-6, 6);
     ghost.velocityY = random(-6, 6);
     ghost.lifetime = 300;
     ghost.addAnimation("GhostIsWalking", ghostAnimation);
     ghost.bounceOff(edges);

     ghostGroup.add(ghost);
   }
}
