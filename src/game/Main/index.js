import 'hud.Splash';
import! 'game.sprites.Sonic';
import! 'game.Modules.Key';

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

            var img = new Image();
            img.src="/resources/images/sonic3_spritesheet.png";
            this.sonic = new game.sprites.Sonic(80, 50, this.context, img);
            this.sonic.idle()
        }

        onFixedUpdate = (time) => {

        }

        onDraw = (interpolation) => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillRect(50, 50, 50, 50);
            this.sonic.onDraw()
        }


        onUpdate = (timestamp, delta) => {
            this.sonic.onUpdate()
        }
    }
);
