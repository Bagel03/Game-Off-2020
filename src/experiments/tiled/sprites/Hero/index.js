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
            this.bounds = [{x:20,y:52,width:24,height:9}]
            this.y_velocity = 0;
            this.x_velocity = 0;
            this.direction=0;
            this.machine = new game.modules.UIMachine
            this.walk = new experiments.tiled.animations.Walking("walk", this);
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
                    var bounds = object.bounds?object.bounds[0] : {x:0,y:0,width:0,height:0}
                    if(boxBox(this.x+this.bounds[0].x,this.y+this.bounds[0].y,this.bounds[0].width,this.bounds[0].height,Math.round(object.x+bounds.x),Math.round(object.y+bounds.y),bounds.width,bounds.height)){
                        this.iscolliding=true;
                        //displace hero away from object
                        if(this.dirstr=="down"){
                            this.y -= 3;
                            // this.y_velocity -= 20;
                        }
                        if(this.dirstr=="up"){
                            this.y += 3;
                            // this.y_velocity += 20;
                        }
                        if(this.dirstr=="left"){
                            this.x += 3;
                            // this.x_velocity += 20;
                        }
                        if(this.dirstr=="right"){
                            this.x -= 3;
                            // this.x_velocity -= 20;
                        }
                    }
                    else {
                        this.iscolliding=false
                    }
                }
            }
        }

        onUpdate(delta){
            if(!this.iscolliding){
                if (Key.isDown(Key.RIGHT)){
                    this.direction=1;
                    this.dirstr = "right";
                    this.x_velocity = 2;
                    this.x += this.x_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else if (Key.isDown(Key.LEFT)) {
                    this.direction=-1;
                    this.dirstr = "left";
                    this.x_velocity = 2;
                    this.x += this.x_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else if (Key.isDown(Key.DOWN)) {
                    this.direction=1;
                    this.dirstr = "down";
                    this.y_velocity = 2;
                    this.y += this.y_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else if (Key.isDown(Key.UP)) {
                    this.direction=-1;
                    this.dirstr = "up";
                    this.y_velocity = 2;
                    this.y += this.y_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else {
                    this.x_velocity = 0;
                    this.y_velocity = 0;
                    this.machine.pop()
                }
            }
        }

    }
);
