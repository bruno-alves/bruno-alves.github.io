class Character {
    constructor(image) {
        this.image = image;
        this.currentFrame = 0;
        this.frames = [
            [0, 0], [220, 0], [440, 0], [660, 0],
            [0, 270], [220, 270], [440, 270], [660, 270],
            [0, 540], [220, 540], [440, 540], [660, 540],
            [0, 810], [220, 810], [440, 810], [660, 810],
        ];
    }

    show() {
        image(this.image, 0, height - 135, 110, 135, this.frames[this.currentFrame][0], this.frames[this.currentFrame][1], 220, 270);
        this.move();
    }

    move() {
        this.currentFrame = this.currentFrame == this.frames.length - 1 ? 0 : this.currentFrame + 1;
    } 
}
