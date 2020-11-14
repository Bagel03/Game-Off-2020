import 'experiments.tiled.sprites.Sprite';
import! 'experiments.tiled.animations.Animation';
import! 'experiments.tiled.animations.Walking';

@tag("hero-sprite");
namespace `experiments.tiled.sprites` (
    class Hero extends experiments.tiled.sprites.Sprite {
        constructor (element){
            super(element);
            this.x=0;
            this.y=0;
            this.y_velocity=0;
            this.isjumping = false;

            // this.stance = new core.ui.game.animations.Animation("stance", this);
            this.walk = new experiments.tiled.animations.Walking("walk", this);
            // this.kneel = new core.ui.game.animations.Kneeling("kneel", this);
            // this.jump = new core.ui.game.animations.Jumping("jump", this);
            // this.hadoken = new core.ui.game.animations.Hadoken("hadoken", this);
            // this.shoryuken = new core.ui.game.animations.Shoryuken("shoryuken", this);
            // setTimeout(_=>console.log(this.getCollider()),1000)
        }

        async onConnected(){
            await super.onConnected();
            // this.walk.start();
        }

        getCollider(){
            // var coords=this.getBoundingClientRect();
            return {
                x:this.x,
                y:this.y,
                width : 210,
                height : 240,
                bottom:this.y+240
            }
        }

        canWalk(){
            return true;
        }

        onDraw(){
            this.walk.onDraw();
        }

        onUpdate(delta){
            this.walk.onUpdate();
        }

    }
);
