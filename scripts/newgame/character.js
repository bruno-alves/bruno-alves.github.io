class Character extends Animation {
    constructor(image, x, y, size, numberFigures, numberColumns) {
        super(image, x, y, size, numberFigures, numberColumns);

        this.startingPositionY = this.y;
        this.jumpHeight = 0;
        this.gravityForce = 3.5;
    }

    jump() { 
        this.jumpHeight = 30;
    }

    gravity() {
        this.y = this.y + this.jumpHeight;
        this.jumpHeight = this.jumpHeight - this.gravityForce;

        if (this.y <= this.startingPositionY)
            this.y = this.startingPositionY;
    }

    isCollidingWithEnemy(enemy, speed) {
        const precision = .7;
        
        return collideRectRect(this.x, height - this.size.customHeight - this.y, this.size.customWidth * precision, this.size.customHeight * precision, 
            enemy.x + speed, height - enemy.size.customHeight - enemy.y, enemy.size.customWidth, enemy.size.customHeight);
    }
}
