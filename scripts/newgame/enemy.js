class Enemy extends Animation {
    constructor(image, x, y, size, numberFigures, numberColumns, speed) {
        super(image, x, y, size, numberFigures, numberColumns);

        this.speed = speed;
    }

    move() {
        this.x = this.x - this.speed;

        if (this.x <= -this.size.customWidth)
            this.x = width;
    }
}
