import! 'game.modules.Camera';
import! 'game.modules.utils.Rectangle';
import! 'game.modules.utils.Vector';
import! 'game.modules.GetConstructorData';
namespace `game.views` (
    @tag("world-view");
    class World extends WebComponent {
        constructor(world, machine) {
            super();
            this.machine = machine;
            this.world = world;
            // this.music = new Audio("/resources/tunes/sawsquarenoise_-_02_-_Towel_Defence_Comic.mp3");
            // this.music.loop=true;
            // this.music.load();
            this.onReset();
            this.img2 = new Image();
            this.img2.src="resources/images/greenhillzone2.png";
            //alert(this.img2);
            this.getWorldData();
        }
        getWorldData(){
            document.addEventListener("savegame",()=>{
                return new game.modules.GetConstructorData(this);
    
            })
         
        }
        onReset(){
            this.isFinished = false;
            this.isStarted=false;
        }

        async onConnected() {
            await super.onConnected();
            // this.onGameOver = this.onGameOver.bind(this);
            // this.world.addEventListener("gameover", this.onGameOver, false);
            this.canvas = this.querySelector('canvas');
            this.context = this.canvas.getContext('2d');

            this.canvas.height = 480; //make canvas fullscreen
            this.canvas.width = 640; //make canvas fullscreen

            this.buffer = document.createElement('canvas').getContext('2d');
            this.buffer.canvas.height = this.canvas.height; //make buffer fullscreen
            this.buffer.canvas.width = this.canvas.width; //make buffer fullscreen

            this.canvas.imageSmoothingEnabled = this.buffer.imageSmoothingEnabled = false;
            this.buffer.canvas.style.imageRendering = this.canvas.style.imageRendering = 'pixelated';
            
            var img = new Image();
            img.src="resources/images/sonic3_spritesheet.png";
            
            
            
            this.sonic = new game.sprites.Sonic((this.canvas.width/2), (this.canvas.height/2), this.buffer, img);
            this.sonic.idle()


            const viewport = new game.modules.utils.Rectangle(0, 0, this.canvas.width, this.canvas.height);
            const target = new game.modules.utils.Rectangle(0, 0, this.canvas.width, this.canvas.height);//draw with offset
            this.camera = new game.modules.Camera(viewport, target);

            this.camera.moveBy(new game.modules.utils.Vector(100, 100), 100, 'linear')
            .then(() => this.camera.moveBy(new game.modules.utils.Vector(-100, -100), 100, 'linear'))


            this.fillScreen();
            this.addEventListener("click", e => this.onPauseMenu(), false, "#pause");
            window.addEventListener('resize', e => this.fillScreen(), false);
        }

        fillScreen(){
                
            // Get the height and width of the window
            var height = document.documentElement.clientHeight;
            var width  = document.documentElement.clientWidth;

            let width_height_ratio = this.canvas.width / this.canvas.height;
            // This makes sure the DISPLAY canvas is resized in a way that maintains the MAP's width / height ratio.
            if (width / height < width_height_ratio) height = Math.floor(width  / width_height_ratio);
            else                                         width  = Math.floor(height * width_height_ratio);

            // This sets the CSS of the DISPLAY canvas to resize it to the scaled height and width.
            this.canvas.style.height = height + 'px';
            this.canvas.style.width  = width  + 'px';
            // //this centers the canvas
            this.canvas.style.marginTop = (innerHeight/2 - height/2) + 'px';
            this.canvas.style.marginLeft = (innerWidth/2 - width/2) + 'px';
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
            this.camera.update();
            this.sonic.onUpdate();
        }
        

        //onDraw, runs 1x per frame. Good place to paint
        onDraw (interpolation){
            
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height)
            let h = innerHeight/2;
            let w = innerWidth/2;

            this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.buffer.fillStyle = 'red';
            this.buffer.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.buffer.fillStyle = 'hsl(175,15%,10%)';
            this.buffer.fillRect(w/2, h/2, w, h);
            ////KAMEHAMEHA ---<(((((   BANG!!!   )))))||||||||||||||||
            this.buffer.drawImage(this.img2,0,0,this.canvas.width, this.canvas.height);
            
            this.sonic.onDraw();
            
            this.camera.render(this.buffer, this.context);
            //until i can understand camera better...
           


        }
    }
)