import! 'experiments.tiled.Point';
import! 'experiments.tiled.Map';
import! 'experiments.tiled.renderers.canvas.Scene';
import! 'game.modules.KeyHandler';
import! 'game.modules.Camera';
import! 'experiments.tiled.sprites.CanvasSprite';
import! 'experiments.tiled.renderers.canvas.Parser';

namespace `experiments.tiled` (
    class TopdownDemo extends World { //a dom app, not a world. dont need loop
        constructor(el){
            super(el);

            //filter clicks only on '.tile' nodes in DOM (4th arg is css match). Ignores clicks on any other object.
            // this.addEventListener("click", e => this.onTileClicked(e), false, ".tile");
        }

        //onConnected fires once when this class is ready in DOM.
        async onConnected() {
            await super.onConnected();
            this.context = document.getElementById('demo').getContext('2d');    
            this.map = new experiments.tiled.Map("resources/maps/topdown/topdown.json");//a json Tiled export -- .tsx is the Tiled project file
            await this.map.load();//await loading
            console.log(this.map)
    
            this.width = this.map.width * this.map.tilewidth;
            this.height = this.map.height * this.map.tileheight;

            this.context.canvas.width = this.width;
            this.context.canvas.height = this.height;

            this.camera = new game.modules.Camera({x: 0, w: 0, w: this.width, h: this.height}, {x: 0, w: 0, w: this.width, h: this.height});
            this.scene = new experiments.tiled.renderers.canvas.Scene(this.width, this.height);

            //render the map
            new experiments.tiled.renderers.canvas.Parser(this.map).addToScene(this.scene);

            this.player = new experiments.tiled.sprites.CanvasSprite(this.scene);

            this.ready=true;
        }

        onFixedUpdate=()=>{
            if(this.ready){
                // this.hero.onUpdate();
            }
        }

        onUpdate=()=>{
            if(this.ready){
                this.player.onUpdate();
            }
        }
        onDraw=()=>{
            if(this.ready){
                this.player.onDraw(this.scene)
                this.scene.render();
                this.context.drawImage(this.scene.context.canvas, 0, 0)
            //     this.camera.render(this.scene.context, this.context);//camera only needed for canvas
            }
        }
    }
);
