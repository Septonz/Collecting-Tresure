
var PLAY=1;
var END=0;
var gameState=PLAY



var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;


function preload(){
  pathImg = loadImage("Road.png");
  gameImg=loadImage("gameOver-1.png");
  restartImg=loadImage("restart.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  game=createSprite(200,150)
 game.addImage(gameImg);
  game.scale=0.5;
    restart=createSprite(200,200)
 restart.addImage(restartImg);
  restart.scale=0.5;
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background("white");
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
   if(gameState===PLAY){
     boy.visible=true;
     path.visible=true;
     path.velocityY = 4;
     game.visible=false;
     
     restart.visible=false;
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
     treasureCollection=treasureCollection+100
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+200
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+400
    }
       if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
         gameState=END
    }
   }
  
   if(gameState===END){
     path.visible=false;
    path.velocityY=0;
   boy.visible=false;
     cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
     game.visible=true;
     restart.visible=true;
     
         cashG.setVelocityXEach(0);
    diamondsG.setVelocityEach(0)
     jwelleryG.setVelocityEach(0)
     swordGroup.setVelocityEach(0)
        cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
       jwelleryG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
     if(mousePressedOver(restart)){
      reset()
      
    }
   }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,50,30);

}

function createCash() {
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 250 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 200 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 300 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
  
}
function reset(){
  gameState=PLAY;
  treasureCollection=0;

  game.visible=false
  restart.visible=false
path.visible=true;
  
}