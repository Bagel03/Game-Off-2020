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


        //logic below is simple butt buggy, complicated
        //TODO: replace with StateMachine/BehaviorTree
        onUpdate(){
            super.onUpdate();
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
            /*
           if(Key.onKeydown){
                //console.log(Key.code);
            switch(Key.code){
                    
                case "ArrowRight":
                    this.run(); //this.x+=5;
                    break;
                case "ArrowLeft":
                    this.walk(); //this.x-=5;
                    break;
                default:
                    //console.log("switch busted");
                   // console.log(Key.code);
                    //this.idle();
                    break;
                
            }
            

            }*/
            
            
            
            
            //how would i get the this.context of sonic?
            //////////////////////////////////////////////////////
            //if(Key.isDown(Key.LEFT)){console.log(this.context);}

            //how would i get the this.context of sonic?
            //////////////////////////////////////////////////////

            //this.context.scale(-1,1);
            
            if(Key.isDown(Key.RIGHT)){
                this.run(); this.x+=2; 
            }
           if(Key.isDown(Key.LEFT)){
                this.walk(); this.x-=2;
            }
             if(Key.isDown(Key.UP)){
                this.idle(); this.y-=2;
            }
             if(Key.isDown(Key.DOWN)){
                this.idle(); this.y+=2;
            }
            
        }
    }
)