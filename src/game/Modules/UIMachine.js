
namespace `game.modules` (
    class UIMachine extends Array {
        constructor() {
            super();
        }

        onUpdate(timestamp, delta){
            var state = this[0];
                state&&!state.isSleeping&&state.onUpdate&&state.onUpdate(timestamp, delta);
        }

        onFixedUpdate(time){
            var state = this[0];
                state&&!state.isSleeping&&state.onFixedUpdate&&state.onFixedUpdate(time);
        }

        onDraw(interpolation){
            var state = this[0];
                state&&!state.isSleeping&&state.onDraw&&state.onDraw(interpolation);
        }

        push(state){
            state && !state.isStarted && state.onStart();
            state && state.onAwake();
            state.isSleeping=false
            this.pop();
            this.unshift(state);
        }

        pop(){
            var current = this[0];
            if(current){
                if(!current.isFinished){
                    current.onSleep()
                    current.isSleeping=true;
                }
                else {
                    current.onExit();
                    this[0]=null;
                }
            }
            this.shift();
        }
    }
);
