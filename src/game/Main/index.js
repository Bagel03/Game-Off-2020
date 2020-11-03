
@tag("game-off");
namespace `game` (
    class Main extends Application {
        constructor(element){
            super(element);
        }

        async onConnected() {
            await super.onConnected();
            console.log("Game-Off 2020!")
        }
    }
);
