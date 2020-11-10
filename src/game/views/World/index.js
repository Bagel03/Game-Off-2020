import! 'game.modules.camera';
import! 'game.modules.utils.rectangle';
import! 'game.modules.utils.vector';
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

            this.canvas.height = window.innerHeight; //make canvas fullscreen
            this.canvas.width = window.innerWidth; //make canvas fullscreen

            this.buffer = document.createElement('canvas').getContext('2d');
            this.buffer.canvas.height = window.innerHeight; //make buffer fullscreen
            this.buffer.canvas.width = window.innerWidth; //make buffer fullscreen
            
            var img = new Image();

            img.src="resources/images/sonic3_spritesheet.png";
            this.sonic = new game.sprites.Sonic((this.canvas.width/2), (this.canvas.height/2), this.buffer, img);
            this.sonic.idle()


            const viewport = new game.modules.utils.Rectangle(0, 0, this.canvas.width, this.canvas.height);
            const target = new game.modules.utils.Rectangle(0, 0, this.canvas.width, this.canvas.height);//draw with offset
            this.camera = new game.modules.Camera(viewport, target);

            this.camera.moveBy(new game.modules.utils.Vector(100, 100), 100, 'linear')
            .then(() => this.camera.moveBy(new game.modules.utils.Vector(-100, -100), 100, 'linear'))



            this.addEventListener("click", e => this.onPauseMenu(), false, "#pause");
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
            console.log(this.sonic.x+" / "+this.sonic.y+" / "+this.sonic.width+" / "+this.sonic.context);
        }
        

        //onDraw, runs 1x per frame. Good place to paint
        onDraw (interpolation){
           
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height)
            let h = innerHeight/2;
            let w = innerWidth/2;
            // console.log("h: "+h+" "+"w: "+w);

            this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.buffer.fillStyle = 'red';
            this.buffer.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.buffer.fillStyle = 'hsl(175,15%,10%)';
            this.buffer.fillRect(w/2, h/2, w, h);
            
            this.sonic.onDraw();
            
            this.camera.render(this.buffer, this.context);

        }
    }
)