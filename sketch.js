var bg;
var chicken;
var invisibleGround,corn,corn_img,cornGroup,enemyGroup;
var score=0;
var gameState= "play";
function preload()  {
  bg_img= loadImage("assets/bg.jpg");
  bg1_img=loadImage("assets/bg1.jpg");
  chickenimg=loadAnimation("assets/chick1.png","assets/chick2.png","assets/chick3.png");
  corn_img=loadImage("assets/corn.png");
  wood_img=loadImage("assets/wood.png");
  rock_img=loadImage("assets/rock.png");
  cat_img=loadAnimation("assets/cat1.png","assets/cat2.png","assets/cat3.png","assets/cat4.png");
  jump_Sound=loadSound("jumpS.wav");
  success_sound=loadSound("success.mp3");
}

function setup() {
  createCanvas(1050,500);
   bg=createSprite(400, 200, 800, 400);
   bg.addImage(bg1_img);

   chicken=createSprite(100,height-100,50,150);
   chicken.addAnimation("running",chickenimg);
   chicken.scale=1.2
  invisibleGround=createSprite(width/2,height-50,width,20);
  cornGroup=new Group();
  enemyGroup=new Group();

}

function draw() {
  background("green");
  if(gameState === "play"){ 
   bg.velocityX=-2;
   if(bg.x<width/4){
     bg.x=width/2;
   }
  if(keyDown(UP_ARROW)){
    chicken.velocityY=-8
    jump_Sound.play();
  }
  chicken.velocityY=chicken.velocityY+0.5;
  chicken.collide(invisibleGround)
  chicken.overlap(cornGroup,function(collector,collected){
    success_sound.play();
    success_sound.setVolume(0.5);
    collected.remove();
    score=score+5;
  })
  chicken.overlap(enemyGroup,function(collector,collected){
    collected.remove();
    score=score-10;
  })
  if(score <0){
    gameState="end"
  }

  drawSprites();
  spawncorns();
  spawnenemies();
  textSize(20);
  fill('black');
text("Score:"+score,width-100,50)
  }
  else if(gameState === "end"){
    console.log("game over")
    gameOver();
  }
}
function spawncorns() {
  if(frameCount%60 === 0) {
    corn=createSprite(  width+50,random(100,height-50),50,50);
    corn.addImage(corn_img);
    corn.velocityX=-4;
    corn.scale=0.15;
    cornGroup.add(corn)
  }
}
function spawnenemies() {
  if(frameCount%200 === 0) {
    enemy=createSprite(  width+50,height-90,50,50);
    var rand=Math.round(random(1,3));
  if(rand === 1){
    enemy.addImage(wood_img);
    enemy.scale=0.2;
  }
  if(rand === 2){
    enemy.addImage(rock_img);
    enemy.scale=0.2;
  }
  if(rand === 3){
    enemy.addAnimation("cat running",cat_img);
  }
   // corn.addImage(corn_img);
    enemy.velocityX=-4;
    //enemy.scale=0.15;
    enemyGroup.add(enemy)
  }
}
function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  },
  function(isConfirm){
    window.location.reload();
  }
  );
}