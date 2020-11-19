namespace `experiments.tiled.sprites`(
    class CanvasSprite{
        constructor(scene){
            this.img = new Image();
            this.img.src = 'resources/images/sonic3_spritesheet.png';
            this.img.addEventListener('load', () => this.render(scene))
            this.imgCords = {x: 0, y: 0, w: 120, h: 120};
            this.pos = {x: 32, y: 32, w: 16, h: 16};
            this.rendered = false;
        }

        render(scene){
            this.sceneID = scene.addImage(this.img, this.pos, this.imgCords);
            this.rendered = true;
        }

        //Runs each animation frame
        onDraw(scene){
            scene.editImage(this.sceneID, this.img, this.pos, this.imgCords);
        }


        onUpdate(){
            if(Key.isDown(Key.LEFT)) this.pos.x -= 2;
            if(Key.isDown(Key.RIGHT)) this.pos.x += 2;
            if(Key.isDown(Key.UP)) this.pos.y -= 2;
            if(Key.isDown(Key.DOWN)) this.pos.y += 2;
        }
    }
)