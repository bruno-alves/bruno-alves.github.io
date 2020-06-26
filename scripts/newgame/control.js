let scenario, character, enemyDroplet, soundTrack

function preload() {
    soundTrack = loadSound('assets/newgame/sounds/soundtrack.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(45);

    scenario = new Scenario(loadImage('assets/newgame/images/forest.png'), 2);
    character = new Character(loadImage('assets/newgame/images/character.png'));
    enemyDroplet = new Enemy(loadImage('assets/newgame/images/droplet.png'))
    //soundTrack.loop();
}
  
function draw() {
    scenario.show();
    scenario.move();

    character.show();
    enemyDroplet.show();
}
