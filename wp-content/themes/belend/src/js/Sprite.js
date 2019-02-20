import { TimelineMax } from 'gsap';

function Sprite(
    image,
    cols,
    rows,
    interval,
    p,
    { loop = false, numberEmpty = 0 }
) {
    this.parent = p;
    this.image = image;
    this.looped = loop;
    this.cols = cols;
    this.rows = rows;
    this.gridWidth = 100 / (cols - 1);
    this.gridHeight = 100 / (rows - 1);
    this.interval = interval;

    this.numberEmpty = numberEmpty;

    this.shouldStop = false;

    this.tl = new TimelineMax({
        paused: true,
        repeat: this.looped ? -1 : 0,
        onRepeat: this.checkShouldStop,
        onRepeatScope: this,
    });

    let count = 0;
    let xpos;
    let ypos;

    for (let r = 0; r < this.rows; r += 1) {
        const columns =
            r === this.rows - 1 ? this.cols - this.numberEmpty : this.cols;

        for (let c = 0; c < columns; c += 1) {
            xpos = c * this.gridWidth;
            ypos = r * this.gridHeight;
            this.tl.set(
                this.image,
                { backgroundPosition: `${xpos}% ${ypos}%` },
                count * this.interval
            );
            count += 1;
        }
    }
}

Sprite.prototype.reInit = function reInit() {
    this.tl.pause(0);
};

Sprite.prototype.play = function play() {
    this.tl.play();
};

Sprite.prototype.pause = function pause() {
    this.tl.pause();
};

Sprite.prototype.stopAtEnd = function stopAtEnd() {
    this.shouldStop = true;
};

Sprite.prototype.checkShouldStop = function checkShouldStop() {
    if (this.shouldStop) {
        this.pause();
        this.parent.startVideoMiddle();
    } else {
        this.tl.resume();
    }
};

export default Sprite;
