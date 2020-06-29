class Character extends Animation {
    constructor(image, amountColuns, amountRows, positionX, positionY, width, height, imagePositionX, imagePositionY, imageWidth, imageHeight) {
        super(image, amountColuns, amountRows, positionX, positionY, width, height, imagePositionX, imagePositionY, imageWidth, imageHeight);

        this.startingPositionY = this.positionY;
        this.jumpHeight = 0;
        this.gravityForce = 3.5;
    }

    jump() { 
        this.jumpHeight = 30;
    }

    gravity() {
        this.positionY = this.positionY - this.jumpHeight;
        this.jumpHeight = this.jumpHeight - this.gravityForce;

        if (this.positionY >= this.startingPositionY)
            this.positionY = this.startingPositionY;
    }

    isCollidingWithEnemy(enemy) {
        const precision = .6;
        
        return collideRectRect(this.positionX, this.positionY, this.width * precision, this.height * precision, 
            enemy.positionX, enemy.positionY, enemy.width * precision, enemy.height * precision);
    }
}
