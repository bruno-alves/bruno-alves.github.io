class Animation {
    constructor(image, amountColuns, amountRows, positionX, positionY, width, height, imagePositionX, imagePositionY, imageWidth, imageHeight) {
        this.image = image;
        this.amountColuns = amountColuns;
        this.amountRows = amountRows;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.imagePositionX = imagePositionX;
        this.imagePositionY = imagePositionY;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
    }

    show() {
        image(this.image, this.positionX, height - this.positionY, this.width, this.height, 
              this.imagePositionX * this.imageWidth, this.imagePositionY * this.imageHeight, 220, 270);
        this.move();
    }

    move() {
        this.imagePositionX = this.imagePositionX + 1;

        if (this.imagePositionX == this.amountColuns) {
            this.imagePositionX = 0;
            this.imagePositionY = this.imagePositionY + 1;
        }

        if (this.imagePositionY == this.amountRows) {
            this.imagePositionX = 0;
            this.imagePositionY = 0;
        }
    }
}
