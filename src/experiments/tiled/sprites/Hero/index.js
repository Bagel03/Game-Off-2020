import 'experiments.tiled.sprites.Sprite';
import! 'experiments.tiled.animations.Animation';
import! 'experiments.tiled.animations.Walking';
import! 'game.modules.UIMachine';

@tag("hero-sprite");
namespace `experiments.tiled.sprites` (
    class Hero extends experiments.tiled.sprites.Sprite {
        constructor (element){
            super(element);
            this.x=0;
            this.y=0;
            this.width = 64;
            this.height = 64;
            this.y_velocity = 0;
            this.x_velocity = 0;
            this.direction=0;
            this.machine = new game.modules.UIMachine
            // this.stance = new core.ui.game.animations.Animation("stance", this);
            this.walk = new experiments.tiled.animations.Walking("walk", this);
            // this.machine.push(this.walk)
            // this.kneel = new core.ui.game.animations.Kneeling("kneel", this);
            // this.jump = new core.ui.game.animations.Jumping("jump", this);
            // this.hadoken = new core.ui.game.animations.Hadoken("hadoken", this);
            // this.shoryuken = new core.ui.game.animations.Shoryuken("shoryuken", this);
            // setTimeout(_=>console.log(this.getCollider()),1000)
        }

        async onConnected(){
            await super.onConnected();
        }


        canWalk(){
            return this.canwalk;
        }

        onDraw(){
            this.machine.onDraw();
        }

        onFixedUpdate(){
            var objects = application.map.objects;
            for(var i=0; i<=objects.length-1;i++){
                var object =objects[i];
                if(object==this){continue}
                else {
                    var bounds = object.bounds[0];
                    // debugger;
                    if(boxBox(this.x,this.y,this.width,this.height,object.x+bounds.x,object.y+bounds.y,bounds.width,bounds.height)){
                        // console.log(this.x,this.y)
                        // this.canwalk=false
                        this.iscolliding=true
                        // this.walk.onUpdate();
                        if(this.dirstr=="down"){
                            this.y -= 10;
                            this.y_velocity -= 20;
                        }
                        if(this.dirstr=="up"){
                            this.y += 10;
                            this.y_velocity += 20;
                        }
                        if(this.dirstr=="left"){
                            this.x += 10;
                            this.x_velocity += 20;
                        }
                        if(this.dirstr=="right"){
                            this.x -= 10;
                            this.x_velocity -= 20;
                        }
                    }
                    else {
                        this.iscolliding=false
                        // this.walk.onUpdate();
                        // this.walk.stop();
                        // this.x = this.x-1;
                        // this.y = this.y-1;
                    }
                }
            }
        }

        onUpdate(delta){
            // this.walk.onUpdate();
            if(!this.iscolliding){
                if (Key.isDown(Key.RIGHT)){
                    this.direction=1;
                    this.dirstr = "right";
                    this.x_velocity = 1;
                    this.machine.push(this.walk)
                    this.machine.onUpdate()
                    // alert("dir:"+this.direction)
                }
                else if (Key.isDown(Key.LEFT)) {
                    this.direction=-1;
                    this.dirstr = "left";
                    this.x_velocity = 1;
                    this.machine.push(this.walk)
                    this.machine.onUpdate()
                }
                else if (Key.isDown(Key.DOWN)) {
                    this.direction=1;
                    this.dirstr = "down";
                    this.y_velocity = 1;
                    this.machine.push(this.walk)
                    this.machine.onUpdate()
                }
                else if (Key.isDown(Key.UP)) {
                    this.direction=-1;
                    this.dirstr = "up";
                    this.y_velocity = 1;
                    this.machine.push(this.walk)
                    this.machine.onUpdate()
                }
                else {
                    this.x_velocity = 0;
                    this.y_velocity = 0;
                    this.machine.pop()
                }
            }
            else{
                this.x_velocity = 0;
                this.y_velocity = 0;
                this.machine.pop();
            }
        }

    }
);
