var player;
var backgroundImg;
var playerImg;
var balas, balasImg;
var wall, wallImg;
var background
var GameState="START"
var balasGroup;
var paredesGroup;
var points=0

function preload(){
  //fondo, avion, balas, paredes
  backgroundImg=loadImage("./assets/fondo.png");
  balasImg=loadImage("./assets/bala.png");
  playerImg=loadImage("./assets/avion1.png");
  wallImg=loadImage("./assets/muro.png");
}

function setup() {
createCanvas(800,1440);

background=createSprite(400, 720);
background.addImage("fondo", backgroundImg);


player=createSprite(370,500,40,40);
player.addImage("avion", playerImg);
player.scale=0.2

balasGroup=new Group();
paredesGroup=new Group();

}



function draw() 
{
  drawSprites();
  //background(backgroundImg);
  fill("#FBD43E")
  textSize(20)
  text("Puntos: "+points, 12,35);


  console.log(background.y)

  if(GameState==="START"&& keyDown("w")){
    GameState="PLAY";
  }

  if(GameState==="PLAY"){
    background.velocityY=1;

    if(background.y>1300){
      background.y=1000
    }
  
    if(keyDown("a")){
    player.x -=3;
  }
  
  
    if(keyDown("d")){
      player.x +=3;
    }
  
    if(keyDown("w")){
      player.velocityY -=1;
    }
    player.velocityY=player.velocityY+0.5;

  crearMuros();
  if(player.isTouching(paredesGroup, removeParedes)){
  points+=5;
  } 

  if(points===30){
    balasGroup.destroyEach();
    paredesGroup.destroyEach();
    player.destroy();
    fill("#fb3f39");
    textSize(60);
    text("¡Ganaste!", 250, 400);
    gameState="START"
  }


  crearBalas();
  if(player.isTouching(balasGroup)){ 
    GameState="OVER";
  }

  }

  if(GameState==="OVER"){
    player.velocityY=0;
    fill("#D20418");
    textSize(50);
    text("Game Over", 250, 400)
  }




  
}

function crearBalas(){
  if(frameCount % 25==0){
    balas=createSprite(random(100,800),0,25,25);
    balas.addImage("balas", balasImg)
    balas.scale=0.10
    balas.velocityY=8;
    balasGroup.add(balas);
  }
}
  function crearMuros(){
    if(frameCount % 70==0){
      wall=createSprite(random(100,600),0,60,60);
      wall.addImage("muro", wallImg);
      wall.scale=0.1;
      wall.velocityY=5;
      paredesGroup.add(wall);
    }
  }
 
  function removeParedes(sprite, paredesGroup){
    paredesGroup.remove();
  }

