namespace `experiments.tiled.sprites`(
    class CanvasSprite{
        constructor(){
            this.img = new Image();
            this.img.src = 'resources/images/sonic3_spritesheet.png';
            this.img.addEventListener('load', () => this.ready = true);
            this.pos = {x: 32, y: 32, w: 16, h: 16}; 
            this.bouds = this.pos//<-- bouding box of the image;
            this.uvs = {x: 32, y: 32, w: 32, h: 32}; 
            this.ready = false;
        }

        //Runs each animation frame
        onDraw(){
        }

        get imageObject(){
            return{
                image: this.img,
                bounds: this.bouds,
                pos: this.pos,
                uvs:this.uvs

            }
        }

        onUpdate(){
            if(Key.isDown(Key.LEFT)) this.pos.x -= 2;
            if(Key.isDown(Key.RIGHT)) this.pos.x += 2;
            if(Key.isDown(Key.UP)) this.pos.y -= 2;
            if(Key.isDown(Key.DOWN)) this.pos.y += 2;
        }
    }
)