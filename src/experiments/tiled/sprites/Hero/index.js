import 'experiments.tiled.sprites.Sprite';
import! 'experiments.tiled.animations.Animation';
import! 'experiments.tiled.animations.Walking';
import! 'game.modules.UIMachine';

@tag("hero-sprite");
namespace `experiments.tiled.sprites` (
    class Hero extends experiments.tiled.sprites.Sprite {
        constructor (element){
            super(element);
            this.x=100;
            this.y=210;
            this.lastX=0;
            this.lastY=0;
            this.width = 64;
            this.height = 64;
            this.bounds = [{x:20,y:52,width:24,height:9}]
            this.y_velocity = 0;
            this.x_velocity = 0;
            this.direction=0;
            this.machine = new game.modules.UIMachine
            this.walk = new experiments.tiled.animations.Walking("walk", this);
            this.sfx_collide = new Audio("/resources/sounds/sfx_sounds_impact1.wav");
            this.sfx_collide.loop=false;
            this.sfx_collide.load();

        }

        async onConnected(){
            await super.onConnected();
        }

        onCollide(object){//displace hero away from object
            this.sfx_collide.play()
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

        onFixedUpdate(delta){
            
        }

        onDraw(interpolation){
            this.machine.onDraw(interpolation);
        }
        
        onUpdate(timestamp, delta){
            const dir = Keyboard.held_directions[0];
            if (dir) {
                // this.lastX = this.x;
                // this.lastY = this.y;
                if (dir === Keyboard.directions.right){
                    this.direction=1;
                    this.dirstr = "right";
                    this.x_velocity = 0.06* delta;
                    this.x += this.x_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else if (dir === Keyboard.directions.left) {
                    this.direction=-1;
                    this.dirstr = "left";
                    this.x_velocity = 0.06* delta;
                    this.x += this.x_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else if (dir === Keyboard.directions.down) {
                    this.direction=1;
                    this.dirstr = "down";
                    this.y_velocity = 0.06* delta;
                    this.y += this.y_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else if (dir === Keyboard.directions.up) {
                    this.direction=-1;
                    this.dirstr = "up";
                    this.y_velocity = 0.06* delta;
                    this.y += this.y_velocity*this.direction;
                    this.machine.push(this.walk)
                }
                else {
                    this.x_velocity = 0;
                    this.y_velocity = 0;
                    this.machine.pop()
                }
            }
            else {
                this.x_velocity = 0;
                this.y_velocity = 0;
                this.machine.pop()
            }
        }
    }
);
