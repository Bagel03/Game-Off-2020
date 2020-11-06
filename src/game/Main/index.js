
@tag("game-off");
namespace `game` (
    class Main extends World {
        constructor(element){
            super(element);
        }

        async onConnected() {
            await super.onConnected();
            console.log("Game-Off 2020!");
        }

        onFixedUpdate = (time) => {

        }

        onDraw = (interpolation) => {
            
        }


        onUpdate = (timestamp, delta) => {
            
        }
    }
);
