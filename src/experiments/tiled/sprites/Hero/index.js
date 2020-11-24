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

        onCollide(object){//displace hero away from object
            if(this.dirstr=="down"){
                this.y -= 3;
            }
            if(this.dirstr=="up"){
                this.y += 3;
            }
            if(this.dirstr=="left"){
                this.x += 3;
            }
            if(this.dirstr=="right"){
                this.x -= 3;
            }
        }

        onFixedUpdate(){}

        onDraw(){
            this.machine.onDraw();
        }
        
        onUpdate(delta){
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
);
