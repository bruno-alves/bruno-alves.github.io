class Enemy extends Animation {
    constructor(image, amountColuns, amountRows, positionX, positionY, width, height, imagePositionX, imagePositionY, imageWidth, imageHeight, speed) {
        super(image, amountColuns, amountRows, positionX, positionY, width, height, imagePositionX, imagePositionY, imageWidth, imageHeight);

        this.speed = speed;
    }

    move() {
        this.positionX = this.positionX - this.speed;

        if (this.positionX < -this.width)
            this.positionX = width;
    }
}
