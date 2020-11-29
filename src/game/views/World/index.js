import! 'game.modules.Camera';
import! 'game.modules.Renderer';
import! 'game.modules.utils.DepthSort';
import! 'game.modules.GetConstructorData';
import! 'game.mdoules.Map';
//Import collider and input
namespace `game.views` (
    @tag("world-view");
    class World extends WebComponent {
        constructor(world, machine) {
            super();
            this.machine = machine;
            this.world = world;
            this.onReset();
            this.getWorldData();
        }

        
        getWorldData(){
            document.addEventListener("savegame",()=>{
                return new game.modules.GetConstructorData(this, "world"); //Create Event and send constructor data
    
            })
         
        }
        onReset(){
            this.isFinished = false;
            this.isStarted=false;
        }

        async onConnected() {
            await super.onConnected();
            
            //Setup Map and Renderer
            this.map = new game.modules.Map('/resources/maps/farmdemo.tmx')//fix with .json tmx or whatever
            await this.map.load();

            this.world = this.querySelector('.world');
            this.renderer   = new game.modules.Renderer(this.world, this.map);
            this.depth      = new game.modules.utils.DepthSort(this.map.objects);
            // this.collider   = new game.modules.Collider(this.hero,this.map.objects);
            this.camera     = new game.modules.Camera(this.world);
            this.camera.lookAt(this.hero)
            // this.camera.moveBy(-100, -100, 50)
            //     .then(() => this.camera.moveBy(100, 100, 50))
            this.ready=true;

            // this.onGameOver = this.onGameOver.bind(this);
            // this.world.addEventListener("gameover", this.onGameOver, false);
            // this.canvas = this.querySelector('canvas');
            // this.context = this.canvas.getContext('2d');

            // this.canvas.height = 480; //make canvas fullscreen
            // this.canvas.width = 640; //make canvas fullscreen

            // this.buffer = document.createElement('canvas').getContext('2d');
            // this.buffer.canvas.height = this.canvas.height; //make buffer fullscreen
            // this.buffer.canvas.width = this.canvas.width; //make buffer fullscreen

            // this.canvas.imageSmoothingEnabled = this.buffer.imageSmoothingEnabled = false;
            // this.buffer.canvas.style.imageRendering = this.canvas.style.imageRendering = 'pixelated';
            
            // var img = new Image();
            // img.src="resources/images/sonic3_spritesheet.png";
            
            // this.sonic = new game.sprites.Sonic((this.canvas.width/2), (this.canvas.height/2), this.buffer, img);
            // this.sonic.idle();


            // let x= 0,y = 0, w = this.canvas.width, h = this.canvas.height;
            // this.camera = new game.modules.Camera({x, y, w, h},{x, y, w, h});
            // console.log(this.camera);
            // this.camera.moveBy(new game.modules.utils.Vector(100, 100), 100, 'linear')
            // .then(() => this.camera.moveBy(new game.modules.utils.Vector(-100, -100), 100, 'linear'))


            // this.fillScreen();
            this.addEventListener("click", e => this.onPauseMenu(), false, "#pause");
            this.ready = true;
        }

        

        onPauseMenu(){
            this.dispatchEvent("pausegame")
        }

        onResume(){
            this.dispatchEvent("resumegame")
        }


        

        //------------------------------MACHINE CALLED----------------------------
        onAwake(){
            this.style.display="block";
            console.log(this.namespace + " Awake");
            // this.music.play();
        }

        onSleep(){
            // this.style.display="none";
            console.log(this.namespace + " Sleeping");
            // this.music.pause();
        }

        onStart() {
            // this.world.settings.music && this.music.play();
            document.body.appendChild(this)
            this.isStarted=true;   
            console.log(this.namespace + " Started");


        }

        onExit(){
            this.remove();
            console.log(this.namespace + " Exit")
            // this.music.pause();
            // this.remove();
            // this.style.display="none";
            // this.world.removeEventListener("gameover", this.onGameOver, false);
            // console.warn(this.namespace + " Ended");
            // this.onReset();
            // this.music.pause();
            // this.machine.push(new display.worlds.aeiou.GameOver(this.world, this.machine));
        }

        //onUpdate, runs 1x per frame. Good place to handle user input
        onUpdate(timestamp, delta){
            Key.isUp(Key.ESC) && this.onPauseMenu();
        }


        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate(time) {
            if(this.ready){
                // this.hero.onUpdate();
                // this.camera.lookAt(this.hero)
            }
        }
        

        //onDraw, runs 1x per frame. Good place to paint
        onDraw (interpolation){
            if(this.ready){
                this.camera.onDraw();
                this.depth.onDraw();
                this.renderer.onDraw();
                // this.hero.onDraw();
            }

            
            // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // let h = innerHeight/2;
            // let w = innerWidth/2;

            // this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // this.buffer.fillStyle = 'red';
            // this.buffer.fillRect(0, 0, this.canvas.width, this.canvas.height);
            // this.buffer.fillStyle = 'hsl(175,15%,10%)';
            // this.buffer.fillRect(w/2, h/2, w, h);
            // ////KAMEHAMEHA ---<(((((   BANG!!!   )))))||||||||||||||||
            // this.buffer.drawImage(this.img2,0,0,this.canvas.width, this.canvas.height);
            
            // this.sonic.onDraw();
            
            // this.camera.render(this.buffer, this.context);
            //until i can understand camera better...
           


        }
    }
)