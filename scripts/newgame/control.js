let scenario, character, enemyDroplet, enemyTroll, soundTrack, jumpingSound

function preload() {
    soundTrack = loadSound('assets/newgame/sounds/soundtrack.mp3');
    jumpingSound = loadSound('assets/newgame/sounds/jump.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(45);

    // Definindo tamanho do personagem e dos inimigos
    let size = {
        character : {width : 220, height : 270, customWidth : 110, customHeight : 135},
        enemyDroplet : {width : 104, height : 104, customWidth : 60, customHeight : 60},
        enemyTroll : {width : 400, height : 400, customWidth : 200, customHeight : 200},
        enemyFlyingDroplet: {width : 200, height : 150, customWidth : 100, customHeight : 75}
    }

    scenario = new Scenario(loadImage('assets/newgame/images/forest.png'), 2);
    character = new Character(loadImage('assets/newgame/images/character.png'), 0, 0, size.character, 16, 4);
    enemyDroplet = new Enemy(loadImage('assets/newgame/images/droplet.png'), width, -5, size.enemyDroplet, 28, 4, 10);
    enemyTroll = new Enemy(loadImage('assets/newgame/images/troll.png'), width, -30, size.enemyTroll, 28, 5, 8);
    enemyFlyingDroplet = new Enemy(loadImage('assets/newgame/images/flyingDroplet.png'), width, 200, size.enemyFlyingDroplet, 16, 3, 5);

    //soundTrack.loop();
}

function keyPressed() {
    if (keyCode === 32) {
        character.jump();
        jumpingSound.play();
    }
}
  
function draw() {
    scenario.animate(); 
     
    character.animate();
    character.gravity();

    enemyDroplet.animate();
    enemyDroplet.move();

    enemyTroll.animate();
    enemyTroll.move();

    enemyFlyingDroplet.animate();
    enemyFlyingDroplet.move();

  /*   if (character.isCollidingWithEnemy(enemyDroplet, 10)) {
        //noLoop();
    } */
}
