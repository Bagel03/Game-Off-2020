import! 'experiments.tiled.Point';
import! 'experiments.tiled.Map';
import! 'experiments.tiled.renderers.html.Isometric';

namespace `experiments.tiled` (
    class TiledMapDemo extends Application { //a dom app, not a world. dont need loop
        constructor(el){
            super(el);

            //filter clicks only on '.tile' nodes in DOM (4th arg is css match). Ignores clicks on any other object.
            this.addEventListener("click", e => this.onTileClicked(e), false, ".tile");
        }

        //onConnected fires once when this class is ready in DOM.
        async onConnected() {
            await super.onConnected();
            this.map = new experiments.tiled.Map("resources/maps/ShiningWars2.json");//a json Tiled export -- .tsx is the Tiled project file
            await this.map.load();//await loading
            this.renderer = new experiments.tiled.renderers.html.Isometric(this/*Context*/, this.map/*Map*/); //replace with canvas renderer
            this.renderer.onDraw();//The dom renders once. no loop needed for redraws, no concept of "fps" in dom.
        }

 
        //dom has real physical layers, it's not a flat canvas "pixel" click.
        //more complicated. Trying to find which objects are under my click
        //through all z layers. Much more complex vs. canvas click. But even
        //on a canvas with multiple "layers", you can't easily determine all
        //objects under mouse unless you make memory map manually. DOM gives
        //it free, naturally.
        onTileClicked(e){
            var w = this.map.tilewidth/2;
            var h = this.map.tileheight/2;
            var scrollLeft = document.documentElement.scrollLeft;
            var scrollTop = document.documentElement.scrollTop;

            var mx = e.src.pageX-scrollLeft;
            var my = e.src.pageY-scrollTop;
            var nodes = document.elementsFromPoint(mx,my);
            var tilenodes = nodes.filter(n => n.classList.contains("tile"));
                tilenodes.forEach(n =>{
                    var coordsA = n.getBoundingClientRect();
                    n.centerX = coordsA.left+ w;
                    n.centerY = coordsA.top + h;
                    n.distToPointX = Math.abs(n.centerX-mx);
                    n.distToPointY = Math.abs(n.centerY-my);
                    n.dist = n.distToPointX*n.distToPointX + n.distToPointY*n.distToPointY;
                });
                tilenodes.sort(function(a, b) {
                  return (a.dist == b.dist) ? 0 : (a.dist > b.dist ? 1 : -1);
                });
            console.log("objects in proximity of click", tilenodes)
            var target = tilenodes.shift();
            console.log(mx,my)
            console.log("top most object", target);
            this.renderer.screenXY_to_mapXY(mx+scrollLeft,my+scrollTop);
        }
    }   
);
