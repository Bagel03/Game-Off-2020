namespace `game.modules`(
    class Map{
        constructor(JSONobj, options){
            this.map = loader.load(JSONobj) //<- Nashorns loader goes there
            this.spritesheet = options.spritesheet;
        }

        render(context){
            this.map.layers.forEach(layer => {
                //do something for now
            });
        }
    }
    
)