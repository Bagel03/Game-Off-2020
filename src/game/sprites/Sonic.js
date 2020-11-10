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
                frames: 8,
            });
        }

        walk() {
            this.frames = 8;
            //this.frameIndex = 0;
            this.row = 1;
            this.ticksPerFrame = 4;
           
        }

        run() {
            this.frames = 4;
           // this.frameIndex = 0;
            this.row = 2;
            this.ticksPerFrame = 2;
        }

        idle() {
            this.frames = 9;
           // this.frameIndex = 0;
            this.row = 0;
            this.ticksPerFrame = 12;
        }


        //logic below is simple butt buggy, complicated
        //TODO: replace with StateMachine/BehaviorTree
        onUpdate(){
            super.onUpdate();
            if(!this.context){return}
            /*
            if(Key.isDown(Key.RIGHT) && Key.isDown(Key.DOWN)){
                if(!this.is_running){
                    this.run();
                    //this.x+=5;
                    this.is_running=true;
                    this.is_walking=false
                }
                return
            }
            else if(Key.isDown(Key.RIGHT)){
                if(!this.is_walking){
                    this.walk();
                    //this.x+=5;
                    this.is_walking=true;
                    this.is_running=false;
                }
                return
            }
            else {
                this.is_walking=false;
                this.is_running=false;
                this.idle();
                
            }
            */
            
            //how would i get the this.context of sonic?
            //////////////////////////////////////////////////////
            //if(Key.isDown(Key.LEFT)){console.log(this.context);}

            //how would i get the this.context of sonic?
            //////////////////////////////////////////////////////

            //this.context.scale(-1,1);
            
            //a lot of diff ways to build this out depending on the gameplay
            if(Key.isDown(Key.RIGHT)){
                this.run(); this.x+=12;
                this.direction = 'right';
            }
            else if(Key.isDown(Key.LEFT)){
                this.run(); this.x-=12; 
                this.direction = 'left';
            }
            else if(Key.isDown(Key.UP)){
                this.walk(); this.y-=6;
            }
            else if(Key.isDown(Key.DOWN)){
                this.walk(); this.y+=6;
            }
            else this.idle();
            
            
            //it would be better to use the canvas dimensions rather than window
            if (this.x > innerWidth){this.x = -100;}
            else if (this.x < -150){this.x = innerWidth;}
            
            if (this.y > innerWidth){this.y = -100;}
            else if (this.y < -150){this.y = innerWidth;}
            
        }


    }
)