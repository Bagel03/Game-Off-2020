import! 'game.modules.camera';
import! 'game.modules.utils.rectangle';
namespace `game.views` (
    @tag("world-view");
    class World extends WebComponent {
        constructor(world, machine) {
            super();
            this.machine = machine;
            // this.actions = new display.worlds.aeiou.Machine;
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

            this.canvas.height = window.innerHeight/2; //make canvas fullscreen/2
            this.canvas.width = window.innerWidth/2; //make canvas fullscreen/2

            this.buffer = document.createElement('canvas').getContext('2d');
            this.buffer.canvas.height = window.innerHeight/2; //make buffer fullscreen/2
            this.buffer.canvas.width = window.innerWidth/2; //make buffer fullscreen/2
            
            var img = new Image();
            img.src="resources/images/sonic3_spritesheet.png";
            this.sonic = new game.sprites.Sonic((this.canvas.width/2), (this.canvas.height/2), this.buffer, img);
            this.sonic.idle()

            const viewport = new game.modules.utils.Rectangle(0, 0, this.canvas.width, this.canvas.height);
            const target = new game.modules.utils.Rectangle(100, 100, this.canvas.width, this.canvas.height);//draw with offset
            this.camera = new game.modules.Camera(viewport, target);
            
            let h = innerHeight/2;
            let w = innerWidth/2;
            // console.log("h: "+h+" "+"w: "+w);
            this.buffer.fillStyle = 'hsl(175,15%,10%)';
            this.buffer.fillRect(0, 0, w, h);
            this.sonic.onDraw()

            this.addEventListener("click", e => this.onPauseMenu(), false, "#pause");
            this.addEventListener("click", e => this.onEndLevel(), false, "#exit");
            // this.addEventListener("click", e => this.onScored(e), false, "#inc-score");
            // this.addEventListener("challengedone", e => this.onChallengeDone(e));
            // this.addEventListener("failed", e => this.onFailedChallenge(e));
            
            // this.actions.push(new display.worlds.aeiou.Challenge(this.world, this, this.machine));
            // this.actions.push(new display.worlds.aeiou.ScoreKeeper(this.world, this.machine));
            // this.actions.push(new display.worlds.aeiou.DamageMeter(this.world, this.machine));
        }

        

        // //onUpdate, runs 1x per frame. Good place to handle user input
        // onUpdate(timestamp, delta) {
        //     // if(Key.isDown(Key.RIGHT) && Key.isDown(Key.DOWN)){
        //     //     console.log("DOWN-RIGHT BEING PRESSED")
        //     // }
        // }

        // onEndLevel(){
        //     debugger;
        //     this.isFinished=true
        //     this.dispatchEvent("gameover");
        //     this.music.pause();
        // }

        // onGameOver(){
        //     this.isFinished=true;
        //     this.music.pause();
        // }

        // onFailedChallenge(){
        //     //TODO: Could be used to decrement lives as a feature (?)
        // }

        // onChallengeDone(){
        //     var doit = !this.isFinished && confirm("Try the next Challenge?")
        //         doit && this.actions.push(new display.worlds.aeiou.Challenge(this.world, this, this.machine));
        // }

        onPauseMenu(){
            // this.machine.push(new display.worlds.aeiou.Menu(this.world, this.machine));
            this.dispatchEvent("pausegame")
        }

        // onScored(e){
        //     this.dispatchEvent("score", {amount:42});
        // }

        // append(vowel){
        //     this.canvas.appendChild(vowel)
        // }
        
        
        

        //----------------MACHINE
        onAwake(){
            this.style.display="block";
            console.log(this.namespace + " Awake");
            // this.music.play();
        }

        onSleep(){
            this.style.display="none";
            console.log(this.namespace + " Sleeping");
            this.music.pause();
        }

        onStart() {
            // this.world.settings.music && this.music.play();
            document.body.appendChild(this)
            // this.world.appendChild(this)
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
            // this.actions.onUpdate();
        }


        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate(time) {
            this.sonic.onUpdate()
        }
        

        //onDraw, runs 1x per frame. Good place to paint
        onDraw (interpolation){
           
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height)
            let h = innerHeight/2;
            let w = innerWidth/2;
            // console.log("h: "+h+" "+"w: "+w);
            this.buffer.fillStyle = 'hsl(175,15%,10%)';
            this.buffer.fillRect(0, 0, w, h);
            this.sonic.onDraw()
            this.camera.render(this.buffer, this.context);
        }
    }
);