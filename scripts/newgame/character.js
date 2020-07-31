class Character extends Animation {
    constructor(image, x, y, size, numberFigures, numberColumns) {
        super(image, x, y, size, numberFigures, numberColumns);

        this.startingPositionY = this.y;
        this.jumpHeight = 0;
        this.gravityForce = 3.5;
        this.skips = 0;
    }

    jump() { 
        if (this.skips < 2) {
            this.jumpHeight = 30;
            this.skips++;
        }
    }

    gravity() {
        this.y = this.y + this.jumpHeight;
        this.jumpHeight = this.jumpHeight - this.gravityForce;

        if (this.y <= this.startingPositionY) {
            this.y = this.startingPositionY;
            this.skips = 0;
        }
            
    }

    isCollidingWithEnemy(enemy) {
        const precision = .7;

        /*
        noFill();
        rect(this.x, height - this.size.customHeight - this.y, this.size.customWidth * precision, this.size.customHeight * precision);
        rect(enemy.x, height - enemy.size.customHeight - enemy.y, enemy.size.customWidth, enemy.size.customHeight);
        */
        
        return collideRectRect(this.x, height - this.size.customHeight - this.y, this.size.customWidth * precision, this.size.customHeight * precision, 
            enemy.x, height - enemy.size.customHeight - enemy.y, enemy.size.customWidth, enemy.size.customHeight);
    }
}
