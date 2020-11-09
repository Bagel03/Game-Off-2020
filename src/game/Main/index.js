import 'hud.Splash';
import 'hud.PauseMenu'
import! 'game.sprites.Sonic';
import! 'game.modules.KeyHandler';

@tag("game-off");
namespace `game` (
    
    class Main extends World {
        constructor(element){
            super(element);
        }
        
        async onConnected() {
            await super.onConnected();
            console.log("Game-Off 2020!");
            this.canvas = this.querySelector('canvas');
            this.context = this.canvas.getContext('2d');

            this.canvas.height = window.innerHeight; //make canvas fullscreen
            this.canvas.width = window.innerWidth; //make canvas fullscreen
            var img = new Image();
            img.src="resources/images/sonic3_spritesheet.png";
            this.sonic = new game.sprites.Sonic((this.canvas.width/2), (this.canvas.height/2), this.context, img);
            this.sonic.idle()
        }

        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate = (time) => {
            this.sonic.onUpdate()
        }
        

        //onDraw, runs 1x per frame. Good place to paint
        onDraw = (interpolation) => {
           
            let h = innerHeight;
            let w = innerWidth;
            // console.log("h: "+h+" "+"w: "+w);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = 'hsl(175,15%,10%)';
            this.context.fillRect(0, 0, w, h);
            this.sonic.onDraw()
        }

        //onUpdate, runs 1x per frame. Good place to handle user input
        onUpdate = (timestamp, delta) => {
            // if(Key.isDown(Key.RIGHT) && Key.isDown(Key.DOWN)){
            //     console.log("DOWN-RIGHT BEING PRESSED")
            // }
        }
    }
);
