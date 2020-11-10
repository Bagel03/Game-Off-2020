import 'hud.Splash';
import 'hud.PauseMenu';
import 'game.views.StartMenu';
import 'game.views.World';
import! 'game.modules.UIMachine';
import! 'game.sprites.Sonic';
import! 'game.modules.KeyHandler';
import! 'game.modules.Audio';

@tag("game-off");
namespace `game` (
    
    class GameOff extends World {
        constructor(element){
            super(element);
            this.settings = {
                music : false
            }

            
            this.machine    = new game.modules.UIMachine;
            this.startmenu  = new game.views.StartMenu(this, this.machine);
            this.world      = new game.views.World(this, this.machine);
            this.pausemenu  = new hud.PauseMenu(this, this.machine);
            this.machine.push(this.startmenu);
        }
        
        async onConnected() {
            await super.onConnected();
            this.addEventListener("startgame",  e => this.onStartGame(e));
            this.addEventListener("pausegame",  e => this.onPauseGame(e));
            this.addEventListener("gameover",   e => this.onGameOver(e));
            this.addEventListener("resumegame",   e => this.onResumeGame(e));
            // window.addEventListener("keydown", e => {
            //     if (e.key === 'Escape') {
            //         this.onPauseGame();
            //     }
            // });
        }

        onGameOver(){
            this.machine.push(this.gameover);
            this.world=null
        }

        onPauseGame(){
            this.machine.push(this.pausemenu);
            // PauseMenu.pause();
        }

        onResumeGame(){
            this.machine.push(this.world);
            // PauseMenu.pause();
        }

        onStartGame(){
            // this.level = this.level
            this.machine.push(this.world);
        }

        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate = (time) => {
            this.machine.onFixedUpdate();
        }
        

        //onDraw, runs 1x per frame. Good place to paint
        onDraw = (interpolation) => {
            this.machine.onDraw();
        }

        //onUpdate, runs 1x per frame. Good place to handle user input
        onUpdate = (timestamp, delta) => {
            this.machine.onUpdate();
            // if(Key.isDown(Key.ESC)){
            //     this.onPauseGame();
            // }
        }
    }
);

