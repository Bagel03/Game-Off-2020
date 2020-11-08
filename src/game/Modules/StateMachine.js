
namespace `game.modules.StateMachine` (
    class UIMachine extends Array {
        constructor() {
            super();
        }

        onUpdate(){
            var state = this[0];
                state&&!state.isSleeping&&state.onUpdate();
        }

        onRender(){
            var state = this[0];
                state&&!state.isSleeping&&state.onRender();
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
