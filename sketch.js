var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY";


//Función para cargar imágenes y animaciones
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

//Función para declarar Sprites y grupos
function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
}

//Función para dibujar los Sprites y establecer reglas del juego
function draw(){
  background(220);
   drawSprites();
  
  //Inicio del juego
  if(gameState==="START" && keyDown("space")){
      //Cambio de estado 
      gameState="PLAY";
  
     }
  
  //Estado PLAY
  if(gameState==="PLAY"){
    //Fondo infinito
    tower.velocityY = 1;
    //Reiniciar fondo
    if(tower.y > 400){
      tower.y = 300
    }
    
    //Gravedad
    ghost.velocityY = ghost.velocityY + 0.8;
    
    //Mover personaje con las flechas 
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    spawnDoors();
    
  }
  
  
  //Estado GAMEOVER 
  
  if(gameState==="GAMEOVER"){
    stroke("red");
    fill("red");
    textSize(70);
    text("perdiste", 100,250)
     textSize(30);
    text("intentalo denuevo", 180,320)
    tower.velocityY=0
     }
  }


//Función para crear bases
function spawnDoors() {
  //escribe aquí el código para aparecer las puertas en la torre 
  if (frameCount % 240 === 0) {
    var door = createSprite(random(120,400), -50, 10, 10);
    door.addImage(doorImg);
    var climber = createSprite(door.x, 10,100, 5);
    climber.addImage(climberImg);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    //Asignar posición en X a climber e invisibleBlock
    climber.x = door.x;
    invisibleBlock.x = door.x;
    invisibleBlock.debug = true;
    
    //Disminuir la profundidad
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    //Dar velocidad a la puerta, barandal y bloque invisible
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

  }
}

