

namespace `game.modules`(
    class GetConstructorData{
        constructor(constructorConstructor, eventname){
            this.eventname = eventname
            this.dispatchSonicData(constructorConstructor);
                
        }
        dispatchSonicData(constructorConstructor){
            this.dispatchData = new CustomEvent(this.eventname, {detail: constructorConstructor});
            document.dispatchEvent(this.dispatchData)
        }
    }

)