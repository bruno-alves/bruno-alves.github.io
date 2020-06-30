let scenario, character, enemyDroplet, enemyTroll, soundTrack, jumpingSound

function preload() {
    soundTrack = loadSound('assets/newgame/sounds/soundtrack.mp3');
    jumpingSound = loadSound('assets/newgame/sounds/jump.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(45);

    scenario = new Scenario(loadImage('assets/newgame/images/forest.png'), 2);
    character = new Character(loadImage('assets/newgame/images/character.png'), 4, 4, 0, height - 135, 110, 135, 0, 0, 220, 270);
    enemyDroplet = new Enemy(loadImage('assets/newgame/images/droplet.png'), 4, 7, width - 60, height - 60, 60, 60, 0, 0, 104, 104, 10);

    enemyTroll = new Enemy(loadImage('assets/newgame/images/troll.png'), 5, 6, width - 200, height - 200, 200, 200, 0, 0, 400, 400, 10);

    //soundTrack.loop();
}

function keyPressed() {
    if (keyCode === 32) {
        character.jump();
        jumpingSound.play();
    }
}
  
function draw() {
    scenario.show();  
    character.show();
    character.gravity();
    
    enemyDroplet.show();
    enemyDroplet.move();

    enemyTroll.show();
    enemyTroll.move();

    if (character.isCollidingWithEnemy(enemyDroplet)) {
       // noLoop();
    }
}
