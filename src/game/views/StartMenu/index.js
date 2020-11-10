
namespace `game.views` (
    @tag("start-menu");
    class StartMenu extends WebComponent {
        constructor(world, machine) {
            super();
            this.machine = machine;
            this.world   = world;
            this.music = new Audio("/resources/sfx/04_start5.wav");
            this.music_select = new Audio("/resources/sfx/Rolemusic_-_the_river.mp3");
            this.music.loop=false;
            this.music.load();
            this.music_select.loop=false;
            this.music_select.load();
            this.onReset();
            
            
        }

        onReset(){
            this.isFinished = false;
            this.isBlocking = true;
            this.isStarted  = false;
        }
       
        async onConnected() {
            
            await super.onConnected();
            
            this.addEventListener("click",  e => this.onStartGame(),    false, "#start-game");
            this.addEventListener("change", e => this.onToggleMusic(e), false, "#enable-music");
            this.addEventListener("click",  e => this.onCreditsHandler(),    false, "#credits");
        
        }
        async onCreditsHandler(){
               console.log("I am onCreditsHandler, and i am working good")
          
         }
        async onToggleMusic(e){
            if(e.target.checked){
                this.music_select.play();
                // await wait(00);
                this.music.play()
            }
            else {
                this.music_select.pause();
                this.music.pause()
            }
            this.world.settings.music = e.target.checked;
        }

        onStartGame(){
            this.dispatchEvent("startgame");
        }
        











        //------------------MACHINE METHODS--------------------
        async onStart() {
            document.body.appendChild(this)
            // if(this.world.settings.music){this.music.play();}
            this.isStarted=true;  
            console.log(this.namespace + " Started")
        }

        onAwake(){
            this.style.display="block";
            console.log(this.namespace + " Awake")
        }

        onSleep(){
            this.style.display="none";
            console.log(this.namespace + " Sleeping")
        }
        onExit(){

        }
        // onEnd(){
        //     debugger;
        //     this.remove();
        //     console.warn(this.namespace + " Ended");
        //     this.onReset();
        //     this.machine.onResume();
        //     this.music.pause();
        // }

        onUpdate(){

        }
    }
);
