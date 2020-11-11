

namespace `game.sprites` (
    class Sprite {
        constructor(options) {
            this.context = options.context;
            this.image = options.image; // Path to image sprite sheet
            this.x = options.x; // Coordinates on canvas
            this.y = options.y;
            this.width = options.width; // Size of sprite frame
            this.height = options.height;
            this.frames = options.frames; // Number of frames in a row
            this.frameIndex = options.frameIndex; // Current frame
            this.row = options.row; // Row of sprites
            this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
            this.tickCount = options.tickCount; // How much time has passed
            this.direction = options.direction || null;
        }

        onUpdate() {

            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.frames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        }

        onDraw() {
            this.context.save();
            this.context.translate(this.x + this.width/2, this.y + this.height/2);
            if(this.direction === 'left') this.context.scale(-1, 1);
<<<<<<< HEAD
            //console.log(this)
=======
>>>>>>> ba87d8707a9f0f37c674ae77d112189554e4bbb8
            this.context.drawImage(
                this.image,
                this.frameIndex * this.width, // The x-axis coordinate of the top left corner
                this.row * this.height, // The y-axis coordinate of the top left corner
                this.width, // The width of the sub-rectangle
                this.height, // The height of the sub-rectangle
                -this.width / 2, // The x coordinate
                -this.height / 2,// The y coordinate
                this.width, // The width to draw the image
                this.height // The width to draw the image
            );
            this.context.restore();
        }
    }
)
