var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var bottomObstable1,bottomObstable2,bottomObstable3
var flyingObstable1,flyingObstable2
var gameOverbutton
var restartbutton
var score = 0

var PLAY = 0;
var END = 0;
var gameState = PLAY;
function preload(){
bgImg = loadImage("assets/bg.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  gameOverbuttonImg = loadImage('assets/gameOver.png')
  restartbuttonImg = loadImage('assets/restart.png')

  flyingObstable1Img= loadImage('assets/obsTop1.png')
  flyingObstable2Img= loadImage('assets/obsTop2.png')

bottomObstable1Img= loadImage('assets/obsBottom1.png')
bottomObstable2Img= loadImage('assets/obsBottom2.png')
bottomObstable3Img= loadImage('assets/obsBottom3.png')

jumpsound = loadSound("assets/jump.mp3")
diesound = loadSound("assets/die.mp3")
}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

flyingObstaclesGroup = new Group()
bottomObstaclesGroup = new Group()
barGroup =new Group()

gameOverbutton = createSprite(200,200 )
gameOverbutton.addImage(gameOverbuttonImg);
gameOverbutton.scale = 0.75;
gameOverbutton.visible = false;
restartbutton = createSprite(190,250,50,50)
restartbutton.addImage(restartbuttonImg);
restartbutton.scale = 0.75;
restartbutton.visible = false; 

}

function draw() {
   if(gameState === PLAY){
     background("black");
        
   //making the hot air balloon jump
   if(keyDown("space")) {
     balloon.velocityY = 8 ;
     jumpsound.play()
   }


   //adding gravity
   balloon.velocityY = balloon.velocityY + -2;


  
 
    spawnTopObstacles()
    spawnBottomObstacles()
    drawSprites();
    bar()
    if(balloon.isTouching(flyingObstaclesGroup)|| balloon.isTouching( bottomObstaclesGroup)){
     gamestate = End
     diesound.play()

    }
    /*if(topObstaclesGroup.isTouching(balloon) || balloon.isTouching(topGround)){
     balloon.velocityY = 6 ;
     jumpSound.play();
   }*/
  
  
   //Adding AI for balloon when touching topObstaclesGroup and topGround
  
   /*if(balloon.isTouching(bottomGround) || bottomObstaclesGroup.isTouching(balloon)){
     balloon.velocityY = -6 ;
     jumpSound.play();
   }*/
 } 

//   if   (gameState === END){
//     gameOverbutton.visible=true 
//     gameOverbutton.depth = gameOverbutton.depth + 1
//     restartbutton.depth = restartbutton.depth + 1
//     restartbutton.visible=true

//     balloon.velocityX = 0
//     balloon.velocityY = 0

//     flyingObstaclesGroup.setVelocityEach(0)
//     bottomObstaclesGroup.setVelocityEach(0)
//     barGroup.setVelocityEach(0)

//     flyingObstaclesGroup.setLifetimeEach(-1)
//     bottomObstaclesGroup.setLifetimeEach(-1)

//     balloon.y= 200
//     if(mousePressedOver(restartbutton)){

//       restart()
//     }



//   } 
//   drawSprites()
//   Score()  
}

function spawnTopObstacles(){

  if(World.frameCount % 60 === 0)  {
  flyingObstacle = createSprite(400,30,40,50);
  flyingObstacle.scale = 0.1
  flyingObstacle.velocityX = -4;
  flyingObstacle.y =  Math.round(random(10,50))
  
  var rand = Math.round(random(1,2));
  switch(rand){
 case 1 : flyingObstacle.addImage(flyingObstable1Img);
          break;
 case 2 : flyingObstacle.addImage(flyingObstable2Img);
default:break;
  }
  flyingObstacle.lifetime = 100;
  balloon.depth = balloon.depth + 1
  flyingObstaclesGroup.add(flyingObstacle);
  }


}

function spawnBottomObstacles(){

  if(World.frameCount % 60 === 0)  {
    bottomObstable = createSprite(400,330,40,50);
    bottomObstable.scale = 0.1
  
  bottomObstable.velocityX = -4;
  
  var rand = Math.round(random(1,2));
  switch(rand){
 case 1 : bottomObstable.addImage(bottomObstable1Img);
          break;
 case 2 : bottomObstable.addImage(bottomObstable2Img);
          break;
 case 3 : bottomObstable.addImage(bottomObstable3Img);
default:break;
  }
  bottomObstable.lifetime = 100;

  bottomObstaclesGroup.add(bottomObstable);
  balloon.depth = balloon.depth + 1
  }


}
function bar(){
if(World.framecount%60=== 0 ){
var bar = createSprite(400,200,10,800)
bar.velocityX = -6
bar.depth = ballon.depth;
bar.lifetime=70
bar.visible=false
barGroup=add(bar)


}

}
function restart(){
  gamestate = Play
gameOverbutton.visible = false
restartbutton.visible = false
flyingObstaclesGroup.destroyEach()
bottomObstaclesGroup.destroyEach()
 score = 0
}

function Score(){
if (balloon.isTouching(barGroup) ){
score = score + 1 

}
textSize(30)

text("Score -"+ score,250,50)
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
    
    bg.addImage(bgImg);
    bg.scale = 1.3
  }
  else{
    
    bg.addImage(bgImg2);
    bg.scale = 1.5
    bg.x=200
    bg.y=200
  }
}