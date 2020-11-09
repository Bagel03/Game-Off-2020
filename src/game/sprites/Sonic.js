import! 'game.sprites.Sprite';

namespace `game.sprites` (
    class Sonic extends game.sprites.Sprite {
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
            this.frames = 8;
            this.frameIndex = 0;
            this.row = 1;
            this.ticksPerFrame = 4;
        }

        run() {
            this.frames = 4;
            this.frameIndex = 0;
            this.row = 2;
            this.ticksPerFrame = 2;
        }

        idle() {
            this.frames = 9;
            this.frameIndex = 0;
            this.row = 0;
            this.ticksPerFrame = 12;
        }


        onUpdate(){
            super.onUpdate();

            if(Key.isDown(Key.RIGHT) && Key.isDown(Key.DOWN)){
                if(!this.is_running){
                    this.run();
                    this.is_running=true;
                    this.is_walking=false
                }
            }
            else if(Key.isDown(Key.RIGHT)){
                if(!this.is_walking){
                    this.walk();
                    this.is_walking=true;
                    this.is_running=false;
                }
            }
            else {
                this.is_walking=false;
                this.is_running=false;
                this.idle();
            }
            
        }
    }
)