
import! 'experiments.tiled.renderers.html.Topdown';
import  'experiments.tiled.sprites.Hero';
import! 'experiments.tiled.DepthSort';
import! 'experiments.tiled.Collider';
import! 'game.modules.KeyHandler';
import! 'experiments.tiled.Map';

namespace `experiments.tiled` (
    class TopdownHtmlDemo extends World {
        constructor(el){
            super(el);
            this.addEventListener("click", e => this.onTileClicked(e), false, ".tile");
        }

        async onConnected() {
            await super.onConnected();
            this.map = new experiments.tiled.Map("resources/maps/topdown/topdown.json");
            await this.map.load();
            
            this.hero = new experiments.tiled.sprites.Hero;
            this.map.objects.push(this.hero);//add to map

            console.log("this.map",this.map)
            this.renderer   = new experiments.tiled.renderers.html.Topdown(this, this.map);
            this.depth      = new experiments.tiled.DepthSort(this.map.objects);
            this.collider   = new experiments.tiled.Collider(this.hero,this.map.objects);
            this.ready=true;
        }

        onFixedUpdate=(time)=>{
            if(this.ready){
                this.collider.onFixedUpdate();
            }
        }

        onUpdate=(timestamp, delta)=>{
            if(this.ready){
                this.hero.onUpdate();
            }
        }

        onDraw=(interpolation)=>{
            if(this.ready){
                this.depth.onDraw();
                this.renderer.onDraw();
                this.hero.onDraw();
            }
        }
        

 
        //dom has real physical layers, it's not a flat canvas "pixel" click.
        //more complicated. Trying to find which objects are under my click
        //through all z layers. Much more complex vs. canvas click. But even
        //on a canvas with multiple "layers", you can't easily determine all
        //objects under mouse unless you make memory map manually. DOM gives
        //it free, naturally.
        onTileClicked(e){
            var w = this.map.tilewidth;
            var h = this.map.tileheight;
            var scrollLeft = document.documentElement.scrollLeft;
            var scrollTop = document.documentElement.scrollTop;

            var mx = e.src.pageX-scrollLeft;
            var my = e.src.pageY-scrollTop;
            
            var nodes = document.elementsFromPoint(mx,my);
            var tilenodes = nodes;//nodes.filter(n => n.classList.contains("tile"));
            console.log("objects in proximity of click", tilenodes)
            var target = tilenodes.shift();
            console.log(mx,my)
            console.log("top most object", target);
            // console.log(this.renderer.screenXY_to_mapXY(mx+scrollLeft,my+scrollTop));
        }
    }   
);
