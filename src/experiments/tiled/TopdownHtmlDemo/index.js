
import! 'experiments.tiled.renderers.html.Topdown';
import  'experiments.tiled.sprites.Hero';
import  'experiments.tiled.sprites.Npc';
import! 'experiments.tiled.DepthSort';
import! 'experiments.tiled.Collider';
import! 'experiments.tiled.input.Keyboard';
import! 'experiments.tiled.Map';
import! 'game.modules.Camera';

namespace `experiments.tiled` (
    class TopdownHtmlDemo extends World {
        constructor(el){
            super(el);
            this.addEventListener("click", e => this.onTileClicked(e), false, ".tile");
        }

        async onConnected() {
            await super.onConnected();
            this.setupFPSCounter();

            this.map = new experiments.tiled.Map("resources/maps/topdown/topdown.json");
            await this.map.load();
            
            this.hero = new experiments.tiled.sprites.Hero;
            this.npc = new experiments.tiled.sprites.Npc;
            this.map.objects.push(this.hero);//add to map
            this.map.objects.push(this.npc);//add to map

            console.log("this.map",this.map);

            this.world = this.querySelector('.world');
            this.renderer   = new experiments.tiled.renderers.html.Topdown(this.world, this.map);
            this.depth      = new experiments.tiled.DepthSort(this.map.objects);
            this.collider   = new experiments.tiled.Collider(this.hero,this.map.objects);
            this.camera     = new game.modules.Camera(this.world);
            this.camera.lookAt(this.hero);
            this.ready=true;
        }

        onFixedUpdate=(time)=>{
            if(this.ready){
                this.collider.onFixedUpdate(time);
            }
        }

        onUpdate=(timestamp, delta)=>{
            if(this.ready){
                this.hero.onUpdate(timestamp, delta);
                this.npc.onUpdate(timestamp, delta);
                this.camera.lookAt(this.hero)
            }
        }

        onDraw=(interpolation)=>{
            if(this.ready){
                this.camera.onDraw(interpolation);
                this.depth.onDraw(interpolation);
                this.renderer.onDraw(interpolation);
                this.hero.onDraw(interpolation);
                this.npc.onDraw(interpolation);
            }
        }

        onUpdateEnd = (fps, panic) => {
            super.onUpdateEnd(fps, panic);
            if(this.fpsCounter){
                this.fpsCounter.textContent = Math.round(fps) + ' FPS';
            }
        }
        onShowFPS = (e) => {
            this.fpsValue.textContent = Math.round(e.target.value);
        }

        onUpdateFPS = (e) => {
            var val = parseInt(e.target.value, 10);
            MainLoop.setMaxAllowedFPS(val === 60 ? Infinity : val);
        }
        

        setupFPSCounter(){
            this.fpsCounter = this.querySelector('#fpscounter');
            this.fpsValue = this.querySelector('#fpsvalue');
            this.fps = this.querySelector('#fps');

            // Update the slider value label while the slider is being dragged.
            this.fps.addEventListener('input',  this.onShowFPS);
            this.fps.addEventListener('change', this.onUpdateFPS);
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
