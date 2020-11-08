import! 'game.sprites.Sprite';

namespace `game.sprites` (
    class Character extends game.sprites.Sprite {
        constructor(x, y, context, image) {
            super({
                context: context,
                image: image,
                x: x,
                y: y,
                width: 114,
                height: 120,
                frameIndex: 0,
                row: 1,
                tickCount: 0,
                ticksPerFrame: 4,
                frames: 8
            });
        }

        walk() {
            this.frames = 8; //tbd
            this.frameIndex = 0;
            this.row = 1;
            this.ticksPerFrame = 4;
        }

        run() {
            this.frames = 4; //tbd
            this.frameIndex = 0;
            this.row = 2;
            this.ticksPerFrame = 2;
        }

        idle() {
            this.frames = 9; //tbd
            this.frameIndex = 0;
            this.row = 0;
            this.ticksPerFrame = 12;
        }

        onUpdate(){
            super.onUpdate();
            if(Key.isDown(Key.Right)){
                
                this.walk();
            }
            
            
        }

    }
)