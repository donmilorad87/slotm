'use strict';

export default class LogoSprite {
    constructor() {
		this.c = document.getElementById("canvasLogo");
		this.ctx = this.c.getContext("2d");
        this.image = new Image();
		this.image.src = '../../img/animation-min.png'
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 0;
        this.numberOfFrames = 60

        this.width = 3840;
        this.height = 64;

        this.start();
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height);
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            0,
            0,
            this.width / this.numberOfFrames,
            this.height
        )
    }

    start() {
        let loop = () => {
            this.update();
            this.render();

            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);
    }
}