@tag("game-off");
namespace `game` (
    class Main extends World {
        constructor(element){
            super(element);
        }

        async onConnected() {
            await super.onConnected();
            console.log("Game-Off 2020!");

            this.Context = this.querySelector('canvas').getContext('2d');

        }

        onFixedUpdate = (time) => {

        }

        onDraw = (interpolation) => {
            this.Context.fillRect(50, 50, 50, 50);
        }


        onUpdate = (timestamp, delta) => {
            
        }
    }
);
