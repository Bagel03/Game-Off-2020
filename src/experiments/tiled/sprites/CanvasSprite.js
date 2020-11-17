namespace `experiments.tiled.sprites`(
    class CanvasSprite{
        constructor(){
            this.img = new Image();
            this.img.src = 'resources/images/sonic3_spritesheet.png';
            this.img.addEventListener('load', () => console.log(this))
            this.imgCords = {x: 0, y: 0, w: 120, h: 120};
            this.pos = {x: 32, y: 32, w: 16, h: 16}
        }
        getImageData(){
            return{
                image: this.img,
                sx: this.imgCords.x,
                sy: this.imgCords.y,
                sw: this.imgCords.w,
                sh: this.imgCords.h,
                dx: this.pos.x, 
                dy: this.pos.y,
                dw: this.pos.w,
                dh: this.pos.h,
                id: 'sprite',
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