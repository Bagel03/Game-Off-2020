import! 'game.stars.Stars';


@tag("credits-hud");
namespace `game.views` (
    class Credits extends WebComponent{
        constructor(world, machine){
            super();
            this.machine = machine;
            this.world = world;
            this.onReset();
        }

        onReset(){
            this.isFinished = false;
            this.isStarted  = false;
        }

        async onConnected(){
            await super.onConnected();

            this.canvas = document.querySelector('canvas');
            this.context = this.canvas.getContext('2d');

            this.canvas.height = 480; //make canvas fullscreen
            this.canvas.width = 640; //make canvas fullscreen

            this.buffer = document.createElement('canvas').getContext('2d');
            this.buffer.canvas.height = this.canvas.height; //make buffer fullscreen
            this.buffer.canvas.width = this.canvas.width; //make buffer fullscreen

            this.canvas.imageSmoothingEnabled = this.buffer.imageSmoothingEnabled = false;
            this.buffer.canvas.style.imageRendering = this.canvas.style.imageRendering = 'pixelated';

            this.stars = new game.stars.Stars();
            //this.stars.initLayers(layers);

           

        }

        //------------------------------MACHINE CALLED----------------------------

        //Called when machine awakes this component. Usualy we hide/show onAwake.
        //and do anything else like play music, sfx, animation etc
        onAwake(){
            this.style.display="block";
            console.log(this.namespace + " Awake");
            // this.music.play();
        }

        //Machine puts it to sleep.Usually hide itself, pause music, animate out.
        onSleep(){
            this.style.display="none";
            console.log(this.namespace + " Sleeping");
            // this.music.pause();
        }

        //Machine calls it once if never started, hence tthe isStarted flag. Usually,
        //you append this component to DOM, which fires onConnected() above.
        onStart() {
            // this.world.settings.music && this.music.play();
            document.body.appendChild(this)
            // this.world.appendChild(this)
            this.isStarted=true;   
            console.log(this.namespace + " Started");

        }


        //Machine calls if isFinished is ever true. Destroy self and cleanup. 
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
        }

        //onUpdate, runs 1x per frame. Good place to handle user input
       onUpdate(timestamp, delta){
            Key.isUp(Key.ESC) && this.dispatchEvent("startmenu");
            



        }


        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate(time) {

            //stars update goes here
            this.stars.onUpdate();
        }

        //onDraw, runs 1x per frame. Good place to paint
        onDraw (interpolation){
            //stars draw methods go here
            this.stars.onDraw();

        }
    }
);