
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
            Key.isUp(Key.ESC) && this.dispatchEvent("startmenu")
        }


        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate(time) {}

        //onDraw, runs 1x per frame. Good place to paint
        onDraw (interpolation){}
    }
);